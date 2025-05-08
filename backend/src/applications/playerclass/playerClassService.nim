import norm/sqlite
import ./playerClassModel
import ./playerClassRepository
import ../allUrlParams
import ../genericArticleRepository

proc getPlayerClasses*(connection: DbConn, params: ReadListParams): seq[PlayerClass] =
  result = connection.getList(PlayerClass)

proc createPlayerClassConnection*(
    connection: DbConn, params: CreateParams, newEntry: var PlayerClassConnection
): PlayerClassConnection =
  result = connection.createEntryInTransaction(newEntry)

proc getCampaignPlayerClasses*(
    connection: DbConn, params: ReadListParams
): seq[PlayerClass] =
  result = connection.getPlayerClasses(params.campaignName)
