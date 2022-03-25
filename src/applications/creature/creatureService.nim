import ../genericArticleRepository
import creatureModel
import norm/sqlite
export creatureModel

proc getCampaignCreatureListOverview*(campaignName: string): seq[CreatureOverview] =
    ## lists all campaign entries using a limited but performant representation of a Creature
    result = getCampaignList(campaignName, CreatureOverview)


proc getCreatureByName*(campaignName: string, entryName: string): CreatureRead = 
    result = getEntryByName(campaignName, entryName, CreatureRead)


proc getCreatureById*(entryId: int64): CreatureRead {.gcsafe.}=
    result = getEntryById(entryId, CreatureRead)


proc getCreatureSerialization*(connection: sqlite.DbConn, entry: Creature): CreatureRead {.gcsafe.}=
    result = connection.getEntryById(entry.id, CreatureRead)

