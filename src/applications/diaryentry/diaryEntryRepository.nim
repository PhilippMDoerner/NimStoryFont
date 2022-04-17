import norm/sqlite
import diaryEntryModel
import ../../utils/djangoDateTime/[normConversion]


proc getDiaryEntriesForCampaign*(connection: DbConn, campaignName: string): seq[DiaryEntryRead] =
  var entries: seq[DiaryEntryRead] = @[newModel(DiaryEntryRead)]
  const condition: string = " session_id_campaign_id.name LIKE ? ORDER BY session_id.id, author_id.id"

  connection.select(entries, condition, campaignName)

  result = entries

proc getDairyEntry*(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool, authorName: string): DiaryEntryRead =
  var entry = newModel(DiaryEntryRead)

  const condition = """
    session_id_campaign_id.name LIKE ? 
    AND session_id.session_number = ? 
    AND session_id.is_main_session = ?
    AND author_id.username LIKE ?
  """

  let queryParams: array[4, DbValue] = [campaignName.dbValue, sessionNumber.dbValue, isMainSession.dbValue, authorName.dbValue]
  connection.select(entry, condition, queryParams)
  
  result = entry