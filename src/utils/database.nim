import ../applicationSettings 
import constructor/defaults
import std/[times, locks, db_sqlite]


proc createRawDatabaseConnection(): DbConn =
    return open(applicationSettings.database, "", "", "")


type PoolConnection* {.defaults.} = object
  connection*: DbConn = createRawDatabaseConnection()
  deathTime: DateTime = now() + initTimeInterval(days = 1)
implDefaults(PoolConnection)


type ConnectionPool* = object
  connections: seq[PoolConnection]
  lock: Lock


var POOL: ConnectionPool
proc isEmptyPool(): bool = POOL.connections.len() == 0


proc initConnectionPool*(initialPoolSize: static int) = 
  POOL.connections = @[]
  initLock(POOL.lock)

  withLock POOL.lock:
    for i in 1..initialPoolSize:
      POOL.connections.add(initPoolConnection())


proc borrowConnection*(): PoolConnection {.gcsafe.} =
  {.cast(gcsafe).}:
    withLock POOL.lock:
      if isEmptyPool():
        echo "CREATED NEW CONNECTION"
        return initPoolConnection()
      
      result = POOL.connections.pop()
      echo "POOL SIZE AFTER BORROW: " & $POOL.connections.len()


proc recycleConnection*(connection: sink PoolConnection) {.gcsafe.} =
  if connection.deathTime < now():
    echo "KILLED CONNECTION"
    return
  
  {.cast(gcsafe).}:
    withLock POOL.lock:
      POOL.connections.add(connection)
      echo "POOL SIZE AFTER RECYCLE: " & $POOL.connections.len()


proc destroyConnectionPool*() =
  deinitLock(POOL.lock)