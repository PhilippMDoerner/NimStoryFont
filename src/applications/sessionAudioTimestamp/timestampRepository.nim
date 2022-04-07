import norm/sqlite
import timestampModel

proc readTimestampsForSessionAudio*(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool): seq[TimestampRead] =
  var entries: seq[TimestampRead] = @[newModel(TimestampRead)]

  const condition = """
    session_audio_id_session_id_campaign_id.name LIKE ? 
    AND session_audio_id_session_id.session_number = ? 
    AND session_audio_id_session_id.is_main_session = ?
  """

  let queryParams: array[3, DbValue] = [campaignName.dbValue(), sessionNumber.dbValue(), isMainSession.dbValue()]
  connection.select(entries, condition, queryParams)
  
  result = entries