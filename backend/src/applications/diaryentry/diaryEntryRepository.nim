import norm/sqlite
import diaryEntryModel
import ../../utils/djangoDateTime/[normConversion]
import ../genericArticleRepository

proc getDiaryEntriesForCampaign*(
    connection: DbConn, campaignName: string
): seq[DiaryEntryRead] =
  const condition: string =
    """ 
    session_id_campaign_id.name LIKE ? 
    ORDER BY session_id.session_number DESC, author_id.id ASC
  """

  result = connection.getList(DiaryEntryRead, condition, campaignName.dbValue())

proc getDairyEntry*(
    connection: DbConn,
    campaignName: string,
    sessionNumber: int,
    isMainSession: bool,
    authorName: string,
): DiaryEntryRead =
  var entry = new(DiaryEntryRead)

  const condition =
    """
    session_id_campaign_id.name LIKE ? 
    AND session_id.session_number = ? 
    AND session_id.is_main_session = ?
    AND author_id.username LIKE ?
  """

  let queryParams: array[4, DbValue] = [
    campaignName.dbValue, sessionNumber.dbValue, isMainSession.dbValue,
    authorName.dbValue,
  ]
  connection.select(entry, condition, queryParams)

  result = entry

# proc getParentLocationsForDiaryentryEncounters*(connection: DbConn, diaryentryId: int64): seq[seq[Location]]
