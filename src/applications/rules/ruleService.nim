import ruleModel
import ../genericArticleRepository

export ruleModel

proc getRuleById*(ruleId: int64): Rule =
    result = getEntryById(ruleId, Rule)

proc getRuleSerialization*(connection: DbConn, entry: Rule): Rule =
    result = entry

proc getCampaignRulesList*(campaignName: string): seq[Rule] =
    result = getCampaignList(campaignName, Rule)

proc getRuleByName*(campaignName: string, entryName: string): Rule =
    result = getEntryByName(campaignName, entryName, Rule)