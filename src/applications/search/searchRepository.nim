import searchModel
import ../../utils/database
import std/db_sqlite
import ../campaign/campaignRepository
import ../../utils/nisane/nisane
import std/sequtils


#TODO: This doesn't work because norm thinks a model should have an id field and search just doesn't
proc findArticles*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchSerializable] =
  let campaign: Campaign = getCampaignByName(campaignName)
  let campaignId: string = $campaign.id
  let searchSQLStatement = """
      SELECT 
          title,
          guid,
          campaign_id,
          record_id,
          bm25(search_article_content, 15) as search_score -- 15 states that a match in the title is 15 times as valuable as a match in the body
      FROM search_article_content 
      WHERE
          campaign_id = """ & campaignId & """
          AND (
              title MATCH ?
              OR title_rev MATCH ?
              OR body MATCH ?
              OR body_rev MATCH ?
          )
      ORDER BY search_score
      LIMIT ?;
  """

  let searchSQLQuery: SqlQuery = sql(searchSQLStatement)

  var rows: seq[Row]
  withDbConn(connection):
    echo "Looking in campaign: " & $campaign.id
    let myrows = connection.getAllRows(
      searchSQLQuery,
      searchText, 
      searchText, 
      searchText, 
      searchText,
      searchLimit
    )
    echo $myrows.len()
    rows = myrows

  echo "Got this many hits: " & $rows.len()
  var searchEntries: seq[SearchSerializable] = @[]
  for row in rows:
    var searchEntry: SearchSerializable = newViewModel(SearchSerializable)
    echo row
    row.to(searchEntry, nil)
    searchEntries.add(searchEntry)

  result = searchEntries