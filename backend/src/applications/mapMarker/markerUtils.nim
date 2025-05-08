import ./markerModel
import ../genericArticleRepository
import ../map/mapModel

proc campaign_id*(entry: Marker): int64 =
  let map: Map = getEntryById(entry.map_id, Map)
  result = map.campaign_id

proc campaign_id*(entry: MarkerRead): int64 =
  result = entry.map_id.campaign_id.id
