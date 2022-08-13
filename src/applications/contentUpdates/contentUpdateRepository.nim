import norm/[sqlite, model]
import std/[strformat]
import ../campaign/campaignService
import ../../applicationSettings
import tinypool/sqlitePool
import contentUpdateModel


proc getRecentlyUpdatedArticleViewEntries*(campaignName: string, pageNumber: int, pageSize: int): seq[UpdatedArticle] =
  let campaign: Campaign = getCampaignByName(campaignName)
  let recentArticleQuery = fmt """
    SELECT table_name, record_id, campaign_id, guid 
    FROM {V_ALL_ARTICLES_TABLE}
    WHERE campaign_id = ?
    ORDER BY update_datetime DESC
    LIMIT ?
    OFFSET ?
  """
  
  let pageStartIndex = pageSize * pageNumber
  let queryParams: array[3, DbValue] = [
    campaign.id.dbValue(),
    pageSize.dbValue(),
    pageStartIndex.dbValue()
  ]

  withDbConn(connection):
    result = @[new(UpdatedArticle)]
    connection.rawSelect(
      recentArticleQuery,
      result, 
      queryParams
    )
