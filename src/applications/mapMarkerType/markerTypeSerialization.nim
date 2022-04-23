import markerTypeModel
import norm/sqlite
import ../genericArticleRepository

type MarkerTypeSerializable* = MarkerType

proc serializeMarkerType*(connection: DbConn, entry: MarkerType): MarkerTypeSerializable = entry


