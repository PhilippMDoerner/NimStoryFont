import ../genericArticleRepository
import creatureModel

export creatureModel

proc getCampaignCreatureListOverview*(campaignName: string): seq[CreatureOverview] =
    ## lists all campaign entries using a limited but performant representation of a Creature
    result = getCampaignList[CreatureOverview](campaignName)


proc getCampaignCreatureList*(campaignName: string): seq[CreatureRead] =
    ## lists all campaign entries using a detailed representation of a Creature
    result = getCampaignList[CreatureRead](campaignName)


proc getCreatureByName*(campaignName: string, entryName: string): CreatureRead = 
    result = getEntryByName[CreatureRead](campaignName, entryName)


proc getCreatureById*(entryId: int64): CreatureRead =
    result = getEntryById[CreatureRead](entryId)


proc deleteCreature*(entryId: int) =
    deleteEntry[Creature](entryId)


proc updateCreature*(entryId: int, entryJsonData: string): CreatureRead =
    let creature: Creature = updateArticleEntry[Creature](entryId, entryJsonData)
    result = getCreatureById(creature.id)


proc createCreature*(entryJsonData: string): CreatureRead =
    let creature = createArticleEntry[Creature](entryJsonData)
    result = getCreatureById(creature.id)