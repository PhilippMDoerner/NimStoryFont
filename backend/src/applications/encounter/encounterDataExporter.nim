import std/[strformat, json]
import norm/[sqlite]
import ./encounterSerialization
import ./encounterService
import ../campaign/campaignModel
import ../genericArticleRepository
import ../allUrlParams
import ../../utils/djangoDateTime/[serialization]

proc exportEncounterData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignEncounters =
    con.readCampaignEncounters(ReadListParams(campaignName: campaign.name))
  let overviewSerializedEncounters = con.overviewSerialize(campaignEncounters)
  let overviewUrl = fmt"/encounter/{campaign.name}/overview/"
  result[overviewUrl] = %*overviewSerializedEncounters

  for encounter in campaignEncounters:
    let pkUrl = fmt"/encounter/pk/{encounter.id}/"
    let serializedData = con.serializeEncounterRead(encounter)
    let serializedDataNode = %*serializedData
    result[pkUrl] = serializedDataNode
