import searchModel
import norm/[sqlite, model]
import std/[strformat, unicode, strutils]
import ../campaign/campaignService
import ../../applicationSettings
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
  let searchSQLStatement: string = fmt """
      SELECT 
          title,
          table_name,
          campaign_id,
          record_id,
          bm25(search_article_content, 15) as search_score -- 15 states that a match in the title is 15 times as valuable as a match in the body
      FROM {SEARCH_TABLE} 
      WHERE
          campaign_id = ?
          AND (
              title MATCH ?
              OR title_rev MATCH ?
              OR body MATCH ?
              OR body_rev MATCH ?
          )
      ORDER BY search_score
      LIMIT ?
  """

  let tokens = searchText.split(' ')
  let tokensRev = searchText.reversed().split(' ')

  let queryParams: array[6, DbValue] = [
    campaign.id.dbValue(),
    tokens.toTitleQueryParam().dbValue(), 
    tokensRev.toTitleQueryParam().dbValue(), 
    tokens.toBodyQueryParam().dbValue(), 
    tokensRev.toBodyQueryParam().dbValue(),
    searchLimit.dbValue()
  ]

  withDbConn(connection):
    result = connection.rawSelectRows(
      searchSQLStatement,
      SearchHit,
      queryParams
    )


proc addSearchEntry*(connection: DbConn, searchTitle: string, searchBody: string, tableName: string, record_id: int64, campaign_id: int64) =
  let guid = fmt"{tableName}_{record_id}"
  let searchHit = Search(
    title: searchTitle,
    title_rev: searchTitle.reverseString(),
    body: searchBody,
    body_rev: searchBody.reverseString(),
    table_name: tableName,
    record_id: record_id,
    campaign_id: campaign_id,
    guid: guid  
  )

  connection.rawInsert(searchHit, SEARCH_TABLE)

proc updateSearchEntryContent*(connection: DbConn, guid: string, searchTitle: string, searchBody: string) =
  let updateSearchEntryQuery = fmt"""
    UPDATE {SEARCH_TABLE} 
    SET
      title = ?,
      title_rev = ?,
      body = ?,
      body_rev = ?
    WHERE guid = ?
  """

  let queryParams: array[5, DbValue] = [
    searchTitle.dbValue(),
    searchTitle.reverseString().dbValue(),
    searchBody.dbValue(),
    searchBody.reverseString().dbValue(),
    guid.dbValue()
  ]

  connection.rawExec(
    updateSearchEntryQuery,
    queryParams,
  )


proc deleteSearchEntry*(connection: DbConn, guid: string) =
    let deleteSearchEntryQuery = fmt"""
      DELETE FROM {SEARCH_TABLE}
      WHERE guid = ?
    """

    connection.rawExec(
      deleteSearchEntryQuery,
      guid.dbValue()
    )
