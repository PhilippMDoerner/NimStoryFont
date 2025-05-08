import std/[strformat, json]
import norm/[sqlite]
import ./playerClassSerialization
import ./playerClassService
import ../allUrlParams
import ../genericArticleRepository
import ../campaign/campaignModel

proc exportPlayerClassData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignPlayerClasses =
    con.getCampaignPlayerClasses(ReadListParams(campaignName: campaign.name))
  let serializedCampaignPlayerClasses =
    con.serializePlayerClasses(campaignPlayerClasses)
  let overviewUrl = fmt"/player_class/{campaign.name}/overview/"
  result[overviewUrl] = %*serializedCampaignPlayerClasses

  let globalPlayerClasses = con.getPlayerClasses(ReadListParams())
  let serializedGlobalPlayerClasses = con.serializePlayerClasses(globalPlayerClasses)
  let globalUrl = "/player_class/"
  result[globalUrl] = %*serializedGlobalPlayerClasses
