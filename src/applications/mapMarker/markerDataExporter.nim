import std/[strformat, json, options, sugar]
import norm/[sqlite]
import ./markerModel
import ./markerService
import ./markerSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../applicationConstants
  
proc exportMarkerData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignMarkers = con.getCampaignMarkers(campaign.name)
  
  for marker in campaignMarkers:
    let pkUrl = fmt"/marker/pk/{marker.id}/"
    let parentName = marker.location_id.parent_location_id.map(data => data.name).get(NONE_STRING)
    let nameUrl = fmt"/marker/{campaign.name}/{parentName}/{marker.location_id.name}"
    let serializedData = con.serializeMarkerRead(marker)
    let serializedDataNode = %*serializedData
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
