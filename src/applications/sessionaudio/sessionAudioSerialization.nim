import sessionaudioModel
import norm/sqlite
import ../genericArticleRepository

type SessionAudioOverview* = SessionAudioRead
type SessionAudioSerializable* = SessionAudioRead
type SessionAudioOverviewSerializable* = SessionAudioOverview


proc serializeSessionAudioRead*(connection: DbConn, entry: SessionAudioRead): SessionAudioSerializable =
    result = entry

proc serializeSessionAudio*(connection: DbConn, entry: SessionAudio): SessionAudioSerializable =
    let fullEntry = connection.getEntryById(entry.id, SessionAudioRead)
    result = connection.serializeSessionAudioRead(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: SessionAudioOverview): SessionAudioOverviewSerializable =
    result = entry
