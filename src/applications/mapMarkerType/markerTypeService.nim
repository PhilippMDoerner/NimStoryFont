import ../genericArticleRepository
import markerTypeModel
import norm/sqlite
export markerTypeModel
import ../allUrlParams

proc getMarkerTypes*(connection: DbConn, requestParams: ReadWithoutParams): seq[MarkerType] =
    ## lists all campaign entries using a limited but performant representation of a MarkerType
    result = connection.getList(MarkerType)
