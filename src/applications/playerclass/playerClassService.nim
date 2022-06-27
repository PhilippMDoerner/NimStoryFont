import ../allUrlParams
import ../genericArticleRepository
import playerClassModel
import norm/sqlite

proc getPlayerClasses*(connection: DbConn, params: ReadListParams): seq[PlayerClass] =
  result = connection.getList(PlayerClass)

proc createPlayerClassConnection*(connection: DbConn, params: CreateParams, newEntry: var PlayerClassConnection): PlayerClassConnection =
  result = connection.createEntryInTransaction(newEntry)