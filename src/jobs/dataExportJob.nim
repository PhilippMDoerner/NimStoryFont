import std/[strformat, json, cmdline]
import norm/sqlite
import ../database
import ../applications/campaign/campaignService
import ../applications/character/characterDataExporter
import ../applications/creature/creatureDataExporter
import ../applications/diaryentry/diaryEntryDataExporter
import ../applications/encounter/encounterDataExporter
import ../applications/item/itemDataExporter
import ../applications/location/locationDataExporter
import ../applications/map/mapDataExporter
import ../applications/mapMarker/markerDataExporter
import ../applications/mapMarkerType/markerTypeDataExporter
import ../applications/nodeMap/nodeMapDataExporter
import ../applications/organization/organizationDataExporter
import ../applications/playerclass/playerClassDataExporter
import ../applications/quest/questDataExporter
import ../applications/quote/quoteDataExporter
import ../applications/rules/ruleDataExporter
import ../applications/session/sessionDataExporter
import ../applications/spell/spellDataExporter
import ../applications/contentUpdates/contentUpdateDataExporter

#[
  A job for creating JSON files that contain publicly accessible data for every member of a given campaign.
  Not particularly security sensitive, therefore the only authentication required is being a member (see nginx config and authenticationController for the necessary auth checks).
  
  Each JSON file maps request URLs to the response of the corresponding JSON endpoint.
]#

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
  let data = merge(
    con.exportCharacterData(campaign),
    con.exportCreatureData(campaign),
    con.exportDiaryEntryData(campaign),
    con.exportEncounterData(campaign),
    con.exportItemData(campaign),
    con.exportLocationData(campaign),
    con.exportMapData(campaign),
    con.exportMarkerData(campaign),
    con.exportMarkerTypeData(campaign),
    con.exportNodeMapData(campaign),
    con.exportOrganizationData(campaign),
    con.exportPlayerClassData(campaign),
    con.exportQuestData(campaign),
    con.exportQuoteData(campaign),
    con.exportRuleData(campaign),
    con.exportSessionData(campaign),
    con.exportSpellData(campaign),
    con.exportRecentUpdatesData(campaign),
  )
  
  result = newJObject()
  for key, value in data.pairs:
    result[fmt"/wiki1/api{key}"] = value

proc main() =
  let databasePath: string = commandLineParams()[0]
  let outputPath: string = commandLineParams()[1]
  initConnectionPool(databasePath, 4)

  withDbConn(con): 
    let campaigns = getAllCampaignReads()
    for campaign in campaigns:
      let totalCampaignData = con.getCampaignData(campaign)
      
      writeFile(fmt"{outputPath}/{campaign.name}-data.json", $totalCampaignData)
main()