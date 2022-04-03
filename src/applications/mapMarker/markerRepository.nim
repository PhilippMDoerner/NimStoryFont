import norm/sqlite
import markerModel
import ../../utils/djangoDateTime/[normConversion]


proc getMarkerForMap*(connection: DbConn, campaignName: string, mapName: string): seq[MarkerRead] =
  var entries: seq[MarkerRead] = @[newModel(MarkerRead)]
  const condition: string = " map_id_campaign_id.name LIKE ? AND map_id.name LIKE ?"

  let queryParams: array[2, DbValue] = [campaignName.dbValue(), mapName.dbValue()]
  connection.select(entries, condition, queryParams)

  result = entries

proc getMarker*(connection: DbConn, campaignName: string, parentLocationName: string, locationName: string, mapName: string): MarkerRead =
  var entry = newModel(MarkerRead)

  const condition = """
    session_id_campaign_id.name LIKE ? 
    AND session_id.session_number = ? 
    AND session_id.is_main_session = ?
    AND author_id.username LIKE ?
  """

  let queryParams: array[4, DbValue] = [campaignName.dbValue, parentLocationName.dbValue, locationName.dbValue, mapName.dbValue]
  connection.select(entry, condition, queryParams)
  
  result = entry