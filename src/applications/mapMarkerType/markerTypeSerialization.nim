import markerTypeModel
import norm/sqlite
import ../genericArticleRepository

type MarkerTypeRead* = MarkerType
type MarkerTypeSerializable* = MarkerTypeRead

proc serializeMarkerTypeRead*(connection: DbConn, entry: MarkerTypeRead): MarkerTypeSerializable =
    result = entry

proc serializeMarkerType*(connection: DbConn, entry: MarkerType): MarkerTypeSerializable =
    let fullEntry = connection.getEntryById(entry.id, MarkerTypeRead)
    result = connection.serializeMarkerTypeRead(fullEntry)


