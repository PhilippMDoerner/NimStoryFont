import timestampModel
import norm/sqlite
import ../genericArticleRepository
import std/[options]

type TimestampSerializable* = object
    pk: int64
    name: string
    time: int
    encounter: Option[int64]
    session_audio: int64

proc serializeTimestampRead*(connection: DbConn, entry: TimestampRead): TimestampSerializable =
    result = TimestampSerializable(
        pk: entry.id,
        name: entry.name,
        time: entry.time,
        encounter: entry.encounter_id,
        session_audio: entry.session_audio_id.id
    )

proc serializeTimestamp*(connection: DbConn, entry: Timestamp): TimestampSerializable =
    result = TimestampSerializable(
        pk: entry.id,
        name: entry.name,
        time: entry.time,
        encounter: entry.encounter_id,
        session_audio: entry.session_audio_id
    )
