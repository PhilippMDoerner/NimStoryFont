import ../base_generics/genericArticleRepository
import creatureModel


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
    result = updateEntry[Creature, CreatureRead](entryId, entryJsonData)


proc createCreature*(entryJsonData: string): CreatureRead =
    result = createEntry[Creature, CreatureRead](entryJsonData)