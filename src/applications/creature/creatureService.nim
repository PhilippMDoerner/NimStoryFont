import ../genericArticleRepository
import ../genericArticleService
import creatureModel
import creatureSerialization
import norm/sqlite
import ../allUrlParams
import ../../utils/databaseUtils
import std/[sugar, sequtils]

export creatureModel
export creatureSerialization

proc getCampaignCreatureList*(requestParams: ReadListParams): seq[CreatureOverviewSerializable] =
    ## lists all campaign entries using a limited but performant representation of a character
    withDbConn(connection):
        let entries = connection.getCampaignList(requestParams.campaignName, CreatureOverview)
        result = entries.map(entry => connection.overviewSerialize(entry))

proc getCreatureById*(connection: DbConn, requestParams: ReadByIdParams): Creature =
    result = connection.getEntryById(requestParams.id, Creature)

proc getCreatureById*(connection: DbConn, requestParams: UpdateParams): Creature =
    result = connection.getEntryById(requestParams.id, Creature)

proc getCreatureByName*(connection: DbConn, requestParams: ReadByNameParams): CreatureRead =
    result = connection.getEntryByName(requestParams.campaignName, requestParams.articleName, CreatureRead)

proc deleteCreature*(connection: DbConn, entry: var Creature)=
    connection.deleteEntryInTransaction(entry)

proc getCreatureList*(connection: DbConn, requestParams: ReadListParams): seq[CreatureOverviewSerializable] =
    result = connection.getCampaignList(requestParams.campaignName, CreatureOverview)


