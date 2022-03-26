import questModel
import ../genericArticleRepository

export questModel

proc getQuestById*(questId: int64): Quest =
    result = getEntryById(questId, Quest)

proc getQuestSerialization*(connection: DbConn, entry: Quest): Quest =
    result = entry

proc getCampaignQuestList*(campaignName: string): seq[Quest] =
    result = getCampaignList(campaignName, Quest)

proc getQuestByName*(campaignName: string, entryName: string): Quest =
    result = getEntryByName(campaignName, entryName, Quest)