import std/[strformat, json]
import norm/[sqlite]
import ./itemModel
import ./itemSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]
  
proc exportItemData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignItems = con.getCampaignList(campaign.name, ItemRead)
  let overviewSerializedItems = con.overviewSerialize(campaignItems)
  let overviewUrl = fmt"/item/{campaign.name}/overview/"
  result[overviewUrl]= %*overviewSerializedItems
  
  for item in campaignItems:
    let pkUrl = fmt"/item/pk/{item.id}/"
    let nameUrl = fmt"/item/{campaign.name}/{item.name}/"
    let serializedData = con.serializeItemRead(item)
    let serializedDataNode = %*serializedData
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
