import mapModel
import ../genericArticleRepository
import ../location/locationModel
import ../mapMarker/markerModel
import ../mapMarkerType/markerTypeModel

export mapModel

#TODO: Figure out what needs to be updated so you can remove this
proc getLocationsOnMap(mapId: int64): seq[Location] =
  var mapShell = newModel(Map)
  mapShell.id = mapId

  result = getManyToMany(mapShell, MarkerRead, Location)
