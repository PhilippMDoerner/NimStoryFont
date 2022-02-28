import searchModel
import norm/model
import std/[db_sqlite, strformat]
import ../campaign/campaignService
#import ../../applicationSettings
import ../../utils/nisane/nisane
import ../../utils/myStrutils
import tinypool


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

  var rows: seq[Row]
  withDbConn(connection):
    rows = connection.getAllRows(
      searchSQLStatement,
      searchText, 
      searchText, 
      searchText, 
      searchText,
      searchLimit
    )

  var searchEntries: seq[SearchHit] = @[]
  for row in rows:
    var searchEntry: SearchHit = newViewModel(SearchHit)
    row.to(searchEntry, nil)
    searchEntries.add(searchEntry)

  result = searchEntries




proc addSearchEntry*(connection: DbConn, searchTitle: string, searchBody: string, tableName: string, record_id: int64, campaign_id: int64) =
  let addSearchEntryQuery = sql"""
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  """

  connection.exec(
    addSearchEntryQuery,
    searchTitle,
    searchTitle.reverseString(),
    searchBody,
    searchBody.reverseString(),
    tableName,
    $recordId,
    $campaignId,
    fmt "{tableName}_{record_id}"
  )

proc updateSearchEntryContent*(connection: DbConn, guid: string, searchTitle: string, searchBody: string) =
  let updateSearchEntryQuery = sql"""
    UPDATE search_article_content 
    SET
      title = ?,
      title_rev = ?,
      body = ?,
      body_rev = ?
    WHERE guid = ?
  """

  connection.exec(
    updateSearchEntryQuery,
    searchTitle,
    searchTitle.reverseString(),
    searchBody,
    searchBody.reverseString(),
    guid
  )


proc deleteSearchEntry*(connection: DbConn, guid: string) =
    let deleteSearchEntryQuery = sql"""
      DELETE FROM search_article_content
      WHERE guid = ?
    """

    connection.exec(
      deleteSearchEntryQuery,
      guid
    )
