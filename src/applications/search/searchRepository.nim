import searchModel
import norm/model
import std/[db_sqlite, strformat, unicode, strutils]
import ../campaign/campaignService
import ../../applicationSettings
import nisane
import ../../utils/myStrutils
import tinypool/sqlitePool
import ../genericRawRepository

proc toTitleQueryParam(tokens: seq[string]): string = 
  let joinedTokens = tokens.join("* OR ")
  result.add(fmt"{joinedTokens}*")

proc toBodyQueryParam(tokens: seq[string]): string =
  let joinedTokens = tokens.join("* AND ")
  result.add(fmt"{joinedTokens}*")

proc search*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchHit] =
  let campaign: Campaign = getCampaignByName(campaignName)
  let campaignId: string = $campaign.id
  let searchSQLStatement: string = fmt """
      SELECT 
          title,
          table_name,
          campaign_id,
          record_id,
          bm25(search_article_content, 15) as search_score -- 15 states that a match in the title is 15 times as valuable as a match in the body
      FROM {SEARCH_TABLE} 
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

  withDbConn(connection):
    result = connection.rawSelectRows(
      searchSQLStatement,
      SearchHit,
      queryParams
    )




proc addSearchEntry*(connection: DbConn, searchTitle: string, searchBody: string, tableName: string, record_id: int64, campaign_id: int64) =
  let addSearchEntryQuery = fmt"""
    INSERT INTO {SEARCH_TABLE} (
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

  connection.rawExec(
    addSearchEntryQuery,
    queryParams
  )

proc updateSearchEntryContent*(connection: DbConn, guid: string, searchTitle: string, searchBody: string) =
  let updateSearchEntryQuery = fmt"""
    UPDATE {SEARCH_TABLE} 
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

  connection.rawExec(
    updateSearchEntryQuery,
    queryParams,
  )


proc deleteSearchEntry*(connection: DbConn, guid: string) =
    let deleteSearchEntryQuery = fmt"""
      DELETE FROM {SEARCH_TABLE}
      WHERE guid = '{guid}'
    """

    connection.rawExec(
      deleteSearchEntryQuery,
      guid
    )
