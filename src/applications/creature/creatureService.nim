import ../genericArticleRepository
import creatureModel
import norm/sqlite
export creatureModel

proc getCampaignCreatureListOverview*(campaignName: string): seq[CreatureOverview] =
    ## lists all campaign entries using a limited but performant representation of a Creature
    result = getCampaignList(campaignName, CreatureOverview)


proc getCampaignCreatureList*(campaignName: string): seq[CreatureRead] =
    ## lists all campaign entries using a detailed representation of a Creature
    result = getCampaignList(campaignName, CreatureRead)


proc getCreatureByName*(campaignName: string, entryName: string): CreatureRead = 
    result = getEntryByName(campaignName, entryName, CreatureRead)


proc getCreatureById*(connection: sqlite.DbConn, entryId: int64): CreatureRead {.gcsafe.}=
    result = connection.getEntryById(entryId, CreatureRead)

#TODO: It is impossible to delete this without things stopping to compile, try to figure out why
proc deleteCreature*(entryId: int64) =
    deleteEntry(entryId, Creature)

proc getCreatureById*(entryId: int64): CreatureRead {.gcsafe.}=
    result = getEntryById(entryId, CreatureRead)
