import norm/sqlite
import markerModel
import ../../utils/djangoDateTime/[normConversion]
import std/[strutils, strformat]
import ../../applicationConstants

proc getMarkerForMap*(connection: DbConn, campaignName: string, mapName: string): seq[MarkerRead] =
  var entries: seq[MarkerRead] = @[newModel(MarkerRead)]
  const condition: string = " map_id_campaign_id.name LIKE ? AND map_id.name LIKE ?"

  let queryParams: array[2, DbValue] = [campaignName.dbValue(), mapName.dbValue()]
  connection.select(entries, condition, queryParams)

  result = entries

proc getMarker*(connection: DbConn, campaignName: string, parentLocationName: string, locationName: string, mapName: string): MarkerRead =
  var entry = newModel(MarkerRead)

  if parentLocationName.toLowerAscii() == NONE_STRING_LOWER:
      var sqlCondition: string = fmt """ 
        map_id_campaign_id.name = ? 
        AND location_id_parent_location_id.name IS NULL 
        AND location_id.name = ? 
        AND map_id.name = ?
      """
      let queryParams: array[3, DbValue] = [campaignName.dbValue(), locationName.dbValue(), mapName.dbValue()]
      connection.select(entry, sqlCondition, queryParams)
  
  else:
      var sqlCondition: string = fmt """
        map_id_campaign_id.name = ? 
        AND location_id_parent_location_id.name = ? 
        AND location_id.name = ? 
        AND map_id.name = ?
      """
      let queryParams: array[4, DbValue] = [campaignName.dbValue(), parentLocationName.dbValue(), locationName.dbValue(), mapName.dbValue()]
      connection.select(entry, sqlCondition, queryParams)
      
  result = entry