import spellModel
import ../genericArticleRepository

export spellModel

proc getSpellById*(spellId: int64): Spell =
    result = getEntryById(spellId, Spell)

proc getSpellSerialization*(connection: DbConn, entry: Spell): Spell =
    result = entry

proc getCampaignSpellList*(campaignName: string): seq[Spell] =
    result = getCampaignList(campaignName, Spell)

proc getSpellByName*(campaignName: string, entryName: string): Spell =
    result = getEntryByName(campaignName, entryName, Spell)