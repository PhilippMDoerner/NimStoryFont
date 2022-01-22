import ../applicationSettings 
import std/[times, monotimes, locks, db_sqlite]


proc createRawDatabaseConnection(): DbConn =
    return open(applicationSettings.database, "", "", "")


type BaseConnectionPool = object
  connections: seq[DbConn]
  lock: Lock


type BurstConnectionPool = object
  connections: seq[DbConn]
  lock: Lock
  keepAliveUntilTimestamp: MonoTime
  isActive: bool

type ConnectionPool = BaseConnectionPool | BurstConnectionPool

var POOL {.global.}: BaseConnectionPool
var BURSTPOOL {.global.}: BurstConnectionPool
proc isEmptyPool(pool: ConnectionPool): bool = pool.connections.len() == 0
proc isBasePoolFull(): bool = POOL.connections.len() == CONNECTION_POOL_SIZE
proc hasBurstPoolExceededLifetime(): bool = getMonoTime() > BURSTPOOL.keepAliveUntilTimestamp

proc addConnections(pool: var ConnectionPool, count: int) =
  withLock pool.lock:
    for i in 1..count:
      POOL.connections.add(createRawDatabaseConnection())


proc initConnectionPool*() = 
  POOL.connections = @[]
  initLock(POOL.lock)
  POOL.addConnections(CONNECTION_POOL_SIZE)

  BURSTPOOL.connections = @[]
  BURSTPOOL.isActive = false
  initLock(BURSTPOOL.lock)


proc activeBurstConnectionPool() =
  BURSTPOOL.addConnections(CONNECTION_POOL_SIZE*2)
  BURSTPOOL.isActive = true
  BURSTPOOL.keepAliveUntilTimestamp = getMonoTime() + initDuration(minutes = 30)


proc deactiveBurstConnectionPool*() =
  BURSTPOOL.isActive = false
  BURSTPOOL.connections = @[]


proc extendBurstPoolLifetime() =
  let hasMaxLifetimeDuration: bool = BURSTPOOL.keepAliveUntilTimestamp - getMonoTime() > initDuration(minutes = 30)
  if hasMaxLifetimeDuration:
    return

  BURSTPOOL.keepAliveUntilTimestamp = BURSTPOOL.keepAliveUntilTimestamp + initDuration(seconds = 5)


proc borrowConnection(): DbConn {.gcsafe.} =
  {.cast(gcsafe).}:
    withLock POOL.lock:
      withLock BURSTPOOL.lock:
        if POOL.isEmptyPool():
          if BURSTPOOL.isActive:
            extendBurstPoolLifetime()

            if BURSTPOOL.isEmptyPool():
              result = createRawDatabaseConnection()
            else: 
              result = BURSTPOOL.connections.pop()
          
          else:
            activeBurstConnectionPool()
            result = BURSTPOOL.connections.pop()

        else:
          if BURSTPOOL.isActive and hasBurstPoolExceededLifetime():
            deactiveBurstConnectionPool()
          
          result = POOL.connections.pop()

        echo "After Borrow: POOL size: " & $POOL.connections.len() & " | BURSTPOOL size: " & $BURSTPOOL.connections.len()



proc recycleConnection(connection: DbConn) {.gcsafe.} =  
  {.cast(gcsafe).}:
    withLock POOL.lock:
      withLock BURSTPOOL.lock:
        if isBasePoolFull() and BURSTPOOL.isActive:
          BURSTPOOL.connections.add(connection)
        elif not isBasePoolFull():
          POOL.connections.add(connection)

        echo "After Recycle: POOL size: " & $POOL.connections.len() & " | BURSTPOOL size: " & $BURSTPOOL.connections.len()


proc destroyConnectionPool*() =
  deinitLock(POOL.lock)
  deinitLock(BURSTPOOL.lock)


template withDbConn*(connection: untyped, body: untyped) =
  #Borrows a database connection, executes the body and then recycles the connection
  block: #ensures connection exists only within the scope of this block
    let connection: DbConn = borrowConnection()
    try:
      body
    finally:
      recycleConnection(connection)
