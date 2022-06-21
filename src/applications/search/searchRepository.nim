import searchModel
import norm/model
import std/[db_sqlite, strformat, unicode, strutils, logging]
import ../campaign/campaignService
#import ../../applicationSettings
import ../../utils/nisane/nisane
import ../../utils/myStrutils
import tinypool/sqlitePool
import jsony

#TODO Replace the hard coded table here with an insert
proc toTitleQueryParam(tokens: seq[string]): string = 
  let joinedTokens = tokens.join("* OR ")
  result.add(fmt"{joinedTokens}*")

proc toBodyQueryParam(tokens: seq[string]): string =
  let joinedTokens = tokens.join("* AND ")
  result.add(fmt"{joinedTokens}*")

proc search*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchHit] =
  let campaign: Campaign = getCampaignByName(campaignName)
  let campaignId: string = $campaign.id
  let searchSQLStatement: SqlQuery = sql fmt """
      SELECT 
          title,
          table_name,
          campaign_id,
          record_id,
          bm25(search_article_content, 15) as search_score -- 15 states that a match in the title is 15 times as valuable as a match in the body
      FROM search_article_content 
      WHERE
          campaign_id = {campaignId}
          AND (
              title MATCH ?
              OR title_rev MATCH ?
              OR body MATCH ?
              OR body_rev MATCH ?
          )
      ORDER BY search_score
      LIMIT ?;
  """

  let tokens = searchText.split(' ')
  let tokensRev = searchText.reversed().split(' ')

  let queryParams: array[5, string] = [
    tokens.toTitleQueryParam(), 
    tokensRev.toTitleQueryParam(), 
    tokens.toBodyQueryParam(), 
    tokensRev.toBodyQueryParam(),
    searchLimit.intToStr()
  ]

  when defined(normDebug):
    log(lvlDebug, fmt"'{searchSQLStatement.string}' <- {queryParams.toJson()}")

  var rows: seq[Row]
  withDbConn(connection):
    rows = connection.getAllRows(
      searchSQLStatement,
      queryParams
    )

  var searchEntries: seq[SearchHit] = @[]
  for row in rows:
    var searchEntry: SearchHit = newViewModel(SearchHit)
    row.to(searchEntry, nil)
    searchEntries.add(searchEntry)

  result = searchEntries




proc addSearchEntry*(connection: DbConn, searchTitle: string, searchBody: string, tableName: string, record_id: int64, campaign_id: int64) =
  let addSearchEntryQuery = sql fmt"""
    INSERT INTO search_article_content (
      title,
      title_rev, 
      body, 
      body_rev, 
      table_name, 
      record_id, 
      campaign_id, 
      guid
    )
    VALUES (?, ?, ?, ?, '{tableName}', {record_id}, {campaign_id}, '{tableName}_{record_id}')
  """

  let queryParams: array[4, string] = [
    searchTitle,
    searchTitle.reverseString(),
    searchBody,
    searchBody.reverseString(),
  ]

  when defined(normDebug):
    log(lvlDebug, fmt"'{addSearchEntryQuery.string}' <- {queryParams.toJson()}")

  connection.exec(
    addSearchEntryQuery,
    queryParams
  )

proc updateSearchEntryContent*(connection: DbConn, guid: string, searchTitle: string, searchBody: string) =
  let updateSearchEntryQuery = sql fmt"""
    UPDATE search_article_content 
    SET
      title = ?,
      title_rev = ?,
      body = ?,
      body_rev = ?
    WHERE guid = '{guid}'
  """

  let queryParams: array[4, string] = [
    searchTitle,
    searchTitle.reverseString(),
    searchBody,
    searchBody.reverseString(),
  ]

  when defined(normDebug):
    log(lvlDebug, fmt"'{updateSearchEntryQuery.string}' <- {queryParams.toJson()}")


  connection.exec(
    updateSearchEntryQuery,
    queryParams,
  )


proc deleteSearchEntry*(connection: DbConn, guid: string) =
    let deleteSearchEntryQuery = sql fmt"""
      DELETE FROM search_article_content
      WHERE guid = '{guid}'
    """

    when defined(normDebug):
      log(lvlDebug, fmt"'{deleteSearchEntryQuery.string}'")

    connection.exec(
      deleteSearchEntryQuery,
      guid
    )
