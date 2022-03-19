import norm/sqlite
import diaryEntryModel
import tinypool
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType]


proc getDiaryEntriesForCampaign*(campaignName: string): seq[DiaryEntryOverview] =
  var entries: seq[DiaryEntryOverview] = @[newModel(DiaryEntryOverview)]
  let condition: string = """
    session_id.id IN (
      SELECT wikientries_session.id
      FROM wikientries_session 
      INNER JOIN wikientries_campaign ON wikientries_session.campaign_id = wikientries_campaign.id
      WHERE wikientries_campaign.name LIKE ?
    )
  """

  withDbConn(connection):
    connection.select(entries, condition, campaignName)

  result = entries