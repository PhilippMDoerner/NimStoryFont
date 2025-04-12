import norm/[model, sqlite]
import sessionModel
import ../../utils/djangoDateTime/[normConversion]
import std/[strformat, strutils]

proc getSession*(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool): SessionRead =
  var entry = new(SessionRead)

  const condition = """
    campaign_id.name LIKE ? 
    AND session_number = ? 
    AND is_main_session = ?
  """

  connection.select(entry, condition, campaignName, sessionNumber, isMainSession)
  
  result = entry

proc getSessionsById*(connection: DbConn, sessionIds: seq[int64]): seq[SessionRead] =
  var entries = @[new(SessionRead)]

  let allIdsStr: string = sessionIds.join(",")
  const sessionTableName = SessionRead.table()
  let condition = fmt"{sessionTableName}.id IN ({allIdsStr})"

  connection.select(entries, condition)

  result = entries