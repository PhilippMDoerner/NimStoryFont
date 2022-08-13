import std/[strformat]
import norm/sqlite
import ../../applicationSettings
import ../genericRawRepository

proc getEncounterCount*(connection: DbConn, campaignId: int64): int =
  const sqlStatement = fmt"""
    SELECT COUNT(*)
    FROM {ENCOUNTER_TABLE} encounter
    INNER JOIN {DIARYENTRY_TABLE} diaryentry ON encounter.diaryentry_id = diaryentry.id
    INNER JOIN {SESSION_TABLE} session ON diaryentry.session_id = session.id
    WHERE session.campaign_id = ?
  """

  result = connection.rawSelectRow(sqlStatement, int, campaignId.dbValue())

proc getDiaryEntryCount*(connection: DbConn, campaignId: int64): int =
  const sqlStatement = fmt"""
    SELECT COUNT(*)
    FROM {DIARYENTRY_TABLE} diaryentry
    INNER JOIN {SESSION_TABLE} session ON diaryentry.session_id = session.id
    WHERE session.campaign_id = ?
  """

  result = connection.rawSelectRow(sqlStatement, int, campaignId.dbValue())


proc getSessionAudioCount*(connection: DbConn, campaignId: int64): int =
  const sqlStatement = fmt"""
    SELECT COUNT(*)
    FROM {SESSIONAUDIO_TABLE} sessionaudio
    INNER JOIN {SESSION_TABLE} session ON sessionaudio.session_id = session.id
    WHERE session.campaign_id = ?
  """

  result = connection.rawSelectRow(sqlStatement, int, campaignId.dbValue())

proc getTimestampCount*(connection: DbConn, campaignId: int64): int =
  const sqlStatement = fmt"""
    SELECT COUNT(*)
    FROM {TIMESTAMP_TABLE} timestamp
    INNER JOIN {SESSIONAUDIO_TABLE} sessionaudio ON timestamp.session_audio_id = sessionaudio.id
    INNER JOIN {SESSION_TABLE} session ON sessionaudio.session_id = session.id
    WHERE session.campaign_id = ?
  """

  result = connection.rawSelectRow(sqlStatement, int, campaignId.dbValue())


proc getQuoteCount*(connection: DbConn, campaignId: int64): int =
  const sqlStatement = fmt"""
    SELECT COUNT(*)
    FROM {QUOTE_TABLE} quote
    INNER JOIN {SESSION_TABLE} session ON quote.session_id = session.id
    WHERE session.campaign_id = ?
  """

  result = connection.rawSelectRow(sqlStatement, int, campaignId.dbValue())


proc getMarkerCount*(connection: DbConn, campaignId: int64): int =
  const sqlStatement = fmt"""
    SELECT COUNT(*)
    FROM {MARKER_TABLE} marker
    INNER JOIN {MAP_TABLE} map ON marker.map_id = map.id
    WHERE map.campaign_id = ?
  """

  result = connection.rawSelectRow(sqlStatement, int, campaignId.dbValue())

