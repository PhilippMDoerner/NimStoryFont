import ../genericArticleRepository
import markerModel
import markerRepository
import norm/sqlite
import ../allUrlParams

export markerModel

proc getMarkerByParam*(connection: DbConn, params: ReadMarkerByNameParams): MarkerRead =
    result = connection.getMarker(params.campaignName, params.parentLocationName, params.locationName, params.articleName)

