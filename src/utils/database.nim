import ../applicationSettings 
import std/[db_sqlite]

#TODO: Change this so that you retrieve a connection from a pool of connections in order to not have to recreate connections
proc getDatabaseConnection*(): DbConn =
    return open(applicationSettings.database, "", "", "")
