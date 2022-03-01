import mapModel
import ../genericArticleRepository
import ../location/locationModel

export mapModel

proc getMapById*(mapId: int64): Map =
  result = getEntryById(mapId, Map)

proc getLocationsOnMap*(mapId: int64): seq[Location] =
  var mapShell = newModel(Map)
  mapShell.id = mapId

  result = getManyToMany(mapShell, MarkerRead, Location)
