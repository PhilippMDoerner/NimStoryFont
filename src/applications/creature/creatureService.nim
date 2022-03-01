import ../genericArticleRepository
import creatureModel

export creatureModel

proc getCampaignCreatureListOverview*(campaignName: string): seq[CreatureOverview] =
    ## lists all campaign entries using a limited but performant representation of a Creature
    result = getCampaignList(campaignName, CreatureOverview)


proc getCampaignCreatureList*(campaignName: string): seq[CreatureRead] =
    ## lists all campaign entries using a detailed representation of a Creature
    result = getCampaignList(campaignName, CreatureRead)


proc getCreatureByName*(campaignName: string, entryName: string): CreatureRead = 
    result = getEntryByName(campaignName, entryName, CreatureRead)


proc getCreatureById*(entryId: int64): CreatureRead =
    result = getEntryById(entryId, CreatureRead)


proc deleteCreature*(entryId: int) =
    deleteEntry(entryId, Creature)


proc updateCreature*(entryId: int, entryJsonData: string): CreatureRead =
    let creature: Creature = updateArticleEntry(entryId, entryJsonData, Creature)
    result = getCreatureById(creature.id)


proc createCreature*(entryJsonData: string): CreatureRead =
    let creature = createArticleEntry(entryJsonData, Creature)
    result = getCreatureById(creature.id)