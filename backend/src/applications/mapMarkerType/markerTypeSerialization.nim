import norm/sqlite
import ./markerTypeModel
import ../genericArticleRepository

type MarkerTypeSerializable* = MarkerType

proc serializeMarkerType*(
    connection: DbConn, entry: MarkerType
): MarkerTypeSerializable =
  entry

proc serializeMarkerTypes*(
    connection: DbConn, entries: seq[MarkerType]
): seq[MarkerTypeSerializable] =
  entries
