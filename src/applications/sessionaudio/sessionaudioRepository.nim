import norm/sqlite
import sessionaudioModel
import ../../utils/djangoDateTime/[normConversion]


proc getSessionAudio*(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool): SessionAudioRead =
  var entry = newModel(SessionAudioRead)

  const condition = """
    session_id_campaign_id.name LIKE ? 
    AND session_id.session_number = ? 
    AND session_id.is_main_session = ?
  """

  connection.select(entry, condition, campaignName, sessionNumber, isMainSession)

  result = entry