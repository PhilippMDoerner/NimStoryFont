import std/[strformat, json]
import norm/[sqlite]
import ./nodeMapModel
import ./nodeMapService
import ./nodeMapSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../allUrlParams
import ../../utils/djangoDateTime/[serialization]

proc exportNodeMapData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let serializedNodeMapData = con.getNodeMap(campaign.name).serializeNodeMap()
  let nodemapDataUrl = fmt"/nodeMap/{campaign.name}/"
  result[nodemapDataUrl] = %*serializedNodeMapData

  let relationships = con.getCampaignCustomLinks(campaign.id)
  let relationshipOverviewUrl = fmt"/relationship/{campaign.name}/overview/"
  result[relationshipOverviewUrl] = %*relationships

  let relationshipTypes =
    con.getCampaignLinkTypes(ReadListParams(campaignName: campaign.name))
  let relationshipTypeOverviewUrl = fmt"/relationshipType/{campaign.name}/overview/"
  result[relationshipTypeOverviewUrl] = %*relationshipTypes
