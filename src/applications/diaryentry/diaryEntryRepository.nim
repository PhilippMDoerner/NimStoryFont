import norm/sqlite
import diaryEntryModel
import tinypool
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType]


proc getDiaryEntriesForCampaign*(campaignName: string): seq[DiaryEntryOverview] =
  var entries: seq[DiaryEntryOverview] = @[newModel(DiaryEntryOverview)]
  const condition: string = " session_id_campaign_id.name LIKE ?"

  withDbConn(connection):
    connection.select(entries, condition, campaignName)

  result = entries