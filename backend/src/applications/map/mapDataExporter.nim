import std/[strformat, json]
import norm/[sqlite]
import ./mapModel
import ./mapSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]

proc exportMapData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignMaps = con.getCampaignList(campaign.name, MapRead)
  let overviewSerializedMaps = con.overviewSerialize(campaignMaps)
  let overviewUrl = fmt"/map/{campaign.name}/overview/"
  result[overviewUrl] = %*overviewSerializedMaps

  for map in campaignMaps:
    let pkUrl = fmt"/map/pk/{map.id}/"
    let nameUrl = fmt"/map/{campaign.name}/{map.name}/"
    let serializedData = con.serializeMapRead(map)
    let serializedDataNode = %*serializedData
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
