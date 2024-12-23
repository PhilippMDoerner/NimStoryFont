import std/[strformat, json]
import norm/[sqlite]
import ./locationModel
import ./locationSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]
  
proc exportLocationData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignLocations = con.getCampaignList(campaign.name, LocationRead)
  let overviewSerializedLocations = con.overviewSerialize(campaignLocations)
  let overviewUrl = fmt"/location/{campaign.name}/overview/"
  result[overviewUrl]= %*overviewSerializedLocations
  
  for location in campaignLocations:
    let pkUrl = fmt"/location/pk/{location.id}/"
    let nameUrl = fmt"/location/{campaign.name}/{location.name}/"
    let serializedData = con.serializeLocationRead(location)
    let serializedDataNode = %*serializedData
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
