import norm/model
import std/[db_sqlite, strformat]
import ../campaign/campaignService
import ../../applicationSettings
import ../../utils/nisane/nisane
import tinypool
import contentUpdateModel


proc getRecentlyUpdatedArticleViewEntries*(campaignName: string, pageNumber: int, pageSize: int): seq[UpdatedArticle] =
  let campaign: Campaign = getCampaignByName(campaignName)
  let campaignId: string = $campaign.id
  let recentArticleQuery: SqlQuery = sql fmt """
    SELECT table_name, record_id, campaign_id, guid 
    FROM {V_ALL_ARTICLES_TABLE}
    WHERE campaign_id = {campaignId}
    ORDER BY update_datetime DESC
    LIMIT ?
    OFFSET ?
  """
  
  let pageStartIndex = pageSize * (pageNumber-1)
  var rows: seq[Row]
  withDbConn(connection):
    rows = connection.getAllRows(
      recentArticleQuery,
      pageSize,
      pageStartIndex
    )

  for row in rows:
    var articleEntry: UpdatedArticle = newViewModel(UpdatedArticle)
    row.to(articleEntry, nil)
    result.add(articleEntry)
