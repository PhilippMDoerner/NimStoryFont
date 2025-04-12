import timestampModel
import norm/sqlite
import ../genericArticleRepository
import std/[options, sugar, sequtils]

type TimestampSerializable* = object
    pk: int64
    name: string
    time: int
    encounter: Option[int64]
    session_audio: int64

proc serialize(entry: TimestampRead | Timestamp, sessionAudioId: int64): TimestampSerializable = 
    result = TimestampSerializable(
        pk: entry.id,
        name: entry.name,
        time: entry.time,
        encounter: entry.encounter_id,
        session_audio: sessionAudioId
    )

proc serializeTimestampRead*(connection: DbConn, entry: TimestampRead): TimestampSerializable =
    result = serialize(entry, entry.session_audio_id.id)

proc serializeTimestamp*(connection: DbConn, entry: Timestamp): TimestampSerializable =
    result = serialize(entry, entry.session_audio_id)

proc serializeTimestampReads*(connection: DbConn, entries: seq[TimestampRead]): seq[TimestampSerializable] =
    result = entries.map(entry => connection.serializeTimestampRead(entry))