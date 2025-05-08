import norm/sqlite
import ./markerModel
import ./markerRepository
import ../genericArticleRepository
import ../allUrlParams

export markerModel

proc getMarkerByParam*(connection: DbConn, params: ReadMarkerByNameParams): MarkerRead =
  result = connection.getMarker(
    params.campaignName, params.parentLocationName, params.locationName,
    params.articleName,
  )

proc getCampaignMarkers*(con: DbConn, campaignName: string): seq[MarkerRead] =
  return con.getMarkersForCampaign(campaignName)
