import norm/sqlite
import sessionaudioModel
import tinypool
import ../../utils/djangoDateTime/[normConversion]


proc getSessionAudio*(campaignName: string, sessionNumber: int, isMainSession: 0..1): SessionAudioRead =
  var entry = newModel(SessionAudioRead)

  const condition = """
    session_id_campaign_id.name LIKE ? 
    AND session_id.session_number = ? 
    AND session_id.is_main_session = ?
  """

  withDbConn(connection):
    connection.select(entry, condition, campaignName, sessionNumber, isMainSession)
  
  result = entry