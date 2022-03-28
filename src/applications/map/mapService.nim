import mapModel
import ../genericArticleRepository
import ../location/locationModel

export mapModel

proc getMapById*(mapId: int64): MapRead =
  result = getEntryById(mapId, MapRead)

proc getLocationsOnMap*(mapId: int64): seq[Location] =
  var mapShell = newModel(Map)
  mapShell.id = mapId

  result = getManyToMany(mapShell, MarkerRead, Location)

proc getMapSerialization*(connection: DbConn, entry: Map): MapRead =
  result = connection.getEntryById(entry.id, MapRead)

proc getCampaignMapListOverview*(campaignName: string): seq[MapRead] =
  result = getCampaignList(campaignName, MapRead)

proc getMapByName*(campaignName: string, entryName: string): MapRead =
  result = getEntryByName(campaignName, entryName, MapRead)