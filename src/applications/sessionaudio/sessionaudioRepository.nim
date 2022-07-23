import norm/[model, sqlite]
import sessionaudioModel
import ../../utils/djangoDateTime/[normConversion]
import std/[sugar, sequtils, options, strutils, strformat]
import ../genericArticleRepository


proc getSessionAudio*(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool): SessionAudioRead =
  var entry = new(SessionAudioRead)

  const condition = """
    session_id_campaign_id.name LIKE ? 
    AND session_id.session_number = ? 
    AND session_id.is_main_session = ?
  """

  connection.select(entry, condition, campaignName, sessionNumber, isMainSession)

  result = entry

proc getSessionAudioForCampaign*(connection: DbConn, campaignName: string): seq[SessionAudioRead] =
  const condition = "session_id_campaign_id.name LIKE ? ORDER BY session_id.session_number DESC"
  result = connection.getList(SessionAudioRead, condition, campaignName.dbValue())

type SessionAudioNeighbours = tuple
  priorNeighbour: Option[SessionAudioRead]
  nextNeighbour: Option[SessionAudioRead]


proc fetchSessionAudioNeighbourIds(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool): seq[int64] =
  const sqlStatement = sql"""
    WITH sessionaudio AS (
      SELECT audio.*, campaign.name AS campaign_name, session.session_number, session.is_main_session, row_number() OVER (ORDER BY session.session_Number, session.is_main_session) AS rownum
      FROM fileserver_sessionaudio audio
      INNER JOIN wikientries_session session ON audio.session_id = session.id
      INNER JOIN wikientries_campaign campaign ON session.campaign_id = campaign.id
      WHERE campaign.name LIKE ?
    ),
    targetRow AS(
      SELECT rownum AS targetRowNum
      FROM sessionaudio
      WHERE session_number = ? AND is_main_session = ?
    )
    SELECT sessionaudio.id
    FROM sessionaudio, targetRow
    WHERE ABS(sessionaudio.rownum - targetRow.targetRowNum) = 1
    ORDER BY sessionaudio.rownum;
  """
  let queryParams: array[3, DbValue] = [campaignName.dbValue(), sessionNumber.dbValue(), isMainSession.dbValue]
  let rows: seq[Row] = connection.getAllRows(sqlStatement, queryParams)
  result = rows.map(row => row[0].i)


proc isPriorEntry(startEntrySessionNumber: int, startEntryWasMainSession: bool, priorEntry: SessionAudioRead): bool =
  result = startEntrySessionNumber > priorEntry.session_id.session_number or startEntryWasMainSession > priorEntry.session_id.is_main_session

proc getSessionAudioNeighbours*(connection: DbConn, campaignName: string, sessionNumber: int, isMainSession: bool): SessionAudioNeighbours =
  let neighbourIds = connection.fetchSessionAudioNeighbourIds(campaignName, sessionNumber, isMainSession)
  let neighbourIdStr: string = neighbourIds.map(id => $id).join(",")
  let condition = fmt"{SessionAudio.table()}.id IN ({neighbourIdStr})"

  var entries = connection.getList(SessionAudioRead, condition)

  case entries.len():
  of 0:
    result.nextNeighbour = none(SessionAudioRead)
    result.priorNeighbour = none(SessionAudioRead)
  
  of 1:
    let foundEntry = entries[0]
    if isPriorEntry(sessionNumber, isMainSession, foundEntry):
      result.priorNeighbour = some(foundEntry)
      result.nextNeighbour = none(SessionAudioRead)
    else:
      result.priorNeighbour = none(SessionAudioRead)
      result.nextNeighbour = some(foundEntry)
  
  of 2:
    result.priorNeighbour = some(entries[0])
    result.nextNeighbour = some(entries[1])
  
  else:
    raise newException(DbError, fmt"Received {entries.len()} neighbours for a sessionaudio entry. There can at most only be 2 neighbours at once!")