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

proc getCreatureById*(requestParams: ReadByIdParams): CreatureSerializable =
    withDbConn(connection):
        result = connection.serialize(requestParams.id)

proc getCreatureByName*(requestParams: ReadByNameParams): CreatureSerializable =
    withDbConn(connection):
        result = connection.serialize(requestParams.campaignName, requestParams.articleName)

proc updateCreature*(requestParams: UpdateParams): CreatureSerializable =
    withDbTransaction(connection):
        let updatedEntry = connection.updateArticle(requestParams.id, requestParams.body, Creature)
        result = connection.serialize(updatedEntry.id)
        
proc deleteCreature*(requestParams: DeleteParams) =
    deleteEntry(requestParams.id, Creature)

proc getCreatureList*(requestParams: ReadListParams): seq[CreatureOverviewSerializable] =
    withDbConn(connection):
        let entries = connection.getCampaignList(requestParams.campaignName, CreatureOverview)
        result = entries.map(entry => connection.overviewSerialize(entry))

proc createCreature*(requestParams: CreateParams): CreatureSerializable =
    withDbTransaction(connection):
        let createdEntry = connection.createArticle(requestParams.body, Creature)
        result = connection.serialize(createdEntry.id)


