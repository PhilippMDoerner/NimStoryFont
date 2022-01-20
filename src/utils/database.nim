import ../applicationSettings 
import std/[db_sqlite]
import constructor/defaults
import std/[times, locks]


proc createRawDatabaseConnection*(): DbConn =
    return open(applicationSettings.database, "", "", "")


type PoolConnection* {.defaults.} = object
  connection: DbConn = createRawDatabaseConnection()
  deathTime: DateTime = now() + initTimeInterval(days = 1)

implDefaults(PoolConnection)

type ConnectionPool* = object
  connections: seq[PoolConnection]
  lock: Lock

var POOL: ConnectionPool
proc isEmptyPool(): bool = POOL.connections.len() == 0

proc initConnectionPool*(initialPoolSize: static int) = 
  POOL = ConnectionPool(connections: @[])
  initLock(POOL.lock)

  for i in 1..initialPoolSize:
    POOL.connections.add(initPoolConnection())


proc borrowConnection*(): PoolConnection =
  acquire(POOL.lock)

  if isEmptyPool():
    return initPoolConnection()

  result = POOL.connections.pop()

  release(POOL.lock)

proc recycleConnection*(connection: sink PoolConnection) =
  if connection.deathTime < now():
    return
  
  acquire(POOL.lock)
  POOL.connections.add(connection)
  release(POOL.lock)

proc destroyConnectionPool*() =
  deinitLock(POOL.lock)