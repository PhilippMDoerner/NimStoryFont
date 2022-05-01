import ../allUrlParams
import ../genericArticleRepository
import playerClassModel
import norm/sqlite

proc getPlayerClasses*(connection: DbConn, params: ReadListParams): seq[PlayerClass] =
  result = connection.getList(PlayerClass)
