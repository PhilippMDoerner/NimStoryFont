import timestampModel
import norm/sqlite
import ../genericArticleRepository

type TimestampSerializable* = TimestampRead

proc serializeTimestampRead*(connection: DbConn, entry: TimestampRead): TimestampSerializable =
    result = entry

proc serializeTimestamp*(connection: DbConn, entry: Timestamp): TimestampSerializable =
    let fullEntry = connection.getEntryById(entry.id, TimestampRead)
    result = connection.serializeTimestampRead(fullEntry)

