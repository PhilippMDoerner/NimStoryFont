import std/[strformat, json]
import norm/[sqlite]
import ./markerTypeSerialization
import ./markerTypeService
import ../allUrlParams
import ../genericArticleRepository
import ../campaign/campaignModel

proc exportMarkerTypeData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignMarkerTypes =
    con.getCampaignMarkerTypes(ReadListParams(campaignName: campaign.name))
  let serializedCampaignMarkerTypes = con.serializeMarkerTypes(campaignMarkerTypes)
  let overviewUrl = fmt"/markerType/{campaign.name}/overview/"
  result[overviewUrl] = %*serializedCampaignMarkerTypes

  let globalMarkerTypes = con.getMarkerTypes(ReadWithoutParams())
  let serializedGlobalMarkerTypes = con.serializeMarkerTypes(globalMarkerTypes)
  let globalUrl = "/markertype/"
  result[globalUrl] = %*serializedGlobalMarkerTypes
