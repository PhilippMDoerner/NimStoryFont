import ../genericArticleRepository
import markerTypeModel
import norm/sqlite
export markerTypeModel

proc getMarkerTypeList*(): seq[MarkerType] =
    ## lists all campaign entries using a limited but performant representation of a MarkerType
    result = getList(MarkerType)


proc getMarkerTypeSerialization*(connection: sqlite.DbConn, entry: MarkerType): MarkerType {.gcsafe.}=
    result = connection.getEntryById(entry.id, MarkerType)

