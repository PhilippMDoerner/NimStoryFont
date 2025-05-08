import norm/sqlite
import markerTypeModel
import markerTypeRepository
import ../genericArticleRepository
import ../allUrlParams

export markerTypeModel

proc getMarkerTypes*(
    connection: DbConn, requestParams: ReadWithoutParams
): seq[MarkerType] =
  ## lists all campaign entries using a limited but performant representation of a MarkerType
  result = connection.getList(MarkerType)

proc getCampaignMarkerTypes*(con: DbConn, params: ReadListParams): seq[MarkerType] =
  return con.getMarkerTypes(params.campaignName)
