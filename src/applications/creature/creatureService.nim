import ../genericArticleRepository
import ../genericArticleService
import creatureModel
import creatureSerialization
import norm/sqlite
import ../allUrlParams

export creatureModel
export creatureSerialization

#TODO: For some unknown reason this is required or nothing compiles ?! 
#Current hypothesis: The fact that a generic handler creator creates a generic handler calling a generic service calling a generic repository
#May lead to issues regarding instantiation and somehow that may lead to things not compiling if not explicitly called at least once (?)
proc getCreatureList*(connection: DbConn, requestParams: ReadListParams): seq[CreatureOverviewSerializable] =
    result = readCampaignArticleList[ReadListParams, CreatureOverview](connection, requestParams)
