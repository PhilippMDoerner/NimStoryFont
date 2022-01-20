import ../applicationSettings 
import std/[db_sqlite]

proc createRawDatabaseConnection*(): DbConn =
    return open(applicationSettings.database, "", "", "")
