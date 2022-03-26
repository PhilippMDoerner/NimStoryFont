import norm/sqlite
import sessionModel
import tinypool
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType]


proc getSession*(campaignName: string, sessionNumber: int, isMainSession: 0..1): SessionRead =
  var entry = newModel(SessionRead)

  const condition = """
    campaign_id.name LIKE ? 
    AND session_number = ? 
    AND is_main_session = ?
  """

  withDbConn(connection):
    connection.select(entry, condition, campaignName, sessionNumber, isMainSession)
  
  result = entry