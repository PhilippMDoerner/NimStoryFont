import norm/sqlite
import timestampModel
import ../genericArticleRepository

proc readTimestampsForSessionAudio*(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool): seq[TimestampRead] =
  const condition = """
    session_audio_id_session_id_campaign_id.name LIKE ? 
    AND session_audio_id_session_id.session_number = ? 
    AND session_audio_id_session_id.is_main_session = ?
  """
  
  result = connection.getList(TimestampRead, condition, campaignName.dbValue(), sessionNumber.dbValue(), isMainSession.dbValue())