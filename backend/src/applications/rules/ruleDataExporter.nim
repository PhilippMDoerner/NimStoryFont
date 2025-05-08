import std/[strformat, json]
import norm/[sqlite]
import ./ruleModel
import ./ruleSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]

proc exportRuleData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignRules = con.getCampaignList(campaign.name, RuleRead)
  let serializedRules = con.serializeRuleReads(campaignRules)
  let overviewUrl = fmt"/rule/{campaign.name}/overview/"
  result[overviewUrl] = %*serializedRules

  let listUrl = fmt"/rule/{campaign.name}/"
  result[listUrl] = %*serializedRules

  for rule in serializedRules:
    let pkUrl = fmt"/rule/pk/{rule.pk}/"
    let nameUrl = fmt"/rule/{campaign.name}/{rule.name}/"
    let serializedDataNode = %*rule
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
