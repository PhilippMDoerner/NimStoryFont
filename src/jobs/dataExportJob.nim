import std/[strformat, json, cmdline]
import norm/sqlite
import ../database
import ../applications/campaign/campaignService
import ../applications/character/characterDataExporter
import ../applications/creature/creatureDataExporter
import ../applications/diaryentry/diaryentryDataExporter
import ../applications/encounter/encounterDataExporter
import ../applications/item/itemDataExporter
import ../applications/location/locationDataExporter
import ../applications/map/mapDataExporter
import ../applications/mapMarker/markerDataExporter
import ../applications/mapMarkerType/markerTypeDataExporter

proc merge(nodes: varargs[JsonNode]): JsonNode =
  for node in nodes:
    if not (node.kind == JObject):
      raise newException(JsonParsingError, "All nodes must be of type JObject in order to merge them")
  
  result = newJObject()
  
  for node in nodes:
    for key, value in node:
      if result.hasKey(key):
        raise newException(JsonParsingError, fmt"The key '{key}' already exists in the json and cannot be overwritten")
      result[key] = value

proc getCampaignData(con: DbConn, campaign: CampaignRead): JsonNode =
  return merge(
    con.exportCharacterData(campaign),
    con.exportCreatureData(campaign),
    con.exportDiaryEntryData(campaign),
    con.exportEncounterData(campaign),
    con.exportItemData(campaign),
    con.exportLocationData(campaign),
    con.exportMapData(campaign),
    con.exportMarkerData(campaign),
    con.exportMarkerTypeData(campaign)
  )

proc main() =
  let databasePath: string = commandLineParams()[0]
  initConnectionPool(databasePath, 4)

  withDbConn(con): 
    let campaigns = getAllCampaignReads()
    for campaign in campaigns:
      let totalCampaignData = con.getCampaignData(campaign)
      
      writeFile(fmt"{campaign.name}.json", $totalCampaignData)
main()