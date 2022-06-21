import norm/sqlite
import sessionModel
import tinypool/sqlitePool except DbConn
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType]


proc getSession*(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool): SessionRead =
  var entry = newModel(SessionRead)

  const condition = """
    campaign_id.name LIKE ? 
    AND session_number = ? 
    AND is_main_session = ?
  """

  connection.select(entry, condition, campaignName, sessionNumber, isMainSession)
  
  result = entry