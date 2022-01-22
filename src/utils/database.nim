import ../applicationSettings 
import std/[times, monotimes, locks, db_sqlite, math]


proc createRawDatabaseConnection(): DbConn =
    return open(applicationSettings.database, "", "", "")


type ConnectionPool = object
  connections: seq[DbConn]
  lock: Lock
  defaultPoolSize: int
  burstEndTime: MonoTime
  isInBurstMode: bool

var POOL {.global.}: ConnectionPool
proc isPoolEmpty(): bool = POOL.connections.len() == 0
proc isPoolFull(): bool = POOL.connections.len() == CONNECTION_POOL_SIZE
proc isPoolAlmostEmptyOrWorse(): bool = POOL.connections.len() < int(round(float(CONNECTION_POOL_SIZE) * 0.25))

proc refillPoolConnections() =
  withLock POOL.lock:
    for i in 1..POOL.defaultPoolSize:
      POOL.connections.add(createRawDatabaseConnection())


proc initConnectionPool*() = 
  POOL.connections = @[]
  POOL.isInBurstMode = false
  POOL.burstEndTime = getMonoTime()
  POOL.defaultPoolSize = CONNECTION_POOL_SIZE
  initLock(POOL.lock)
  refillPoolConnections()


proc activateBurstMode() =
  POOL.isInBurstMode = true
  POOL.burstEndTime = getMonoTime() + initDuration(minutes = 30)
  refillPoolConnections()

proc updatePoolBurstModeState() =
  if not POOL.isInBurstMode:
    return

  if getMonoTime() > POOL.burstEndTime:
    POOL.isInBurstMode = false


proc extendBurstModeLifetime() =
  if POOL.isInBurstMode == false:
    raise newException(DbError, "Tried to extend pool lifetime while Pool wasn't in burst mode, there's a logic issue")

  let hasMaxLifetimeDuration: bool = POOL.burstEndTime - getMonoTime() > initDuration(minutes = 30)
  if hasMaxLifetimeDuration:
    return

  POOL.burstEndTime = POOL.burstEndTime + initDuration(seconds = 5)


proc borrowConnection(): DbConn {.gcsafe.} =
  {.cast(gcsafe).}:
    withLock POOL.lock:
      if isPoolEmpty():
        activateBurstMode()

      elif isPoolAlmostEmptyOrWorse() and POOL.isInBurstMode: 
        extendBurstModeLifetime()
        
      result = POOL.connections.pop()
      echo "After Borrow: POOL size: " & $POOL.connections.len()


proc recycleConnection(connection: DbConn) {.gcsafe.} =  
  {.cast(gcsafe).}:
    withLock POOL.lock:
      updatePoolBurstModeState()

      if isPoolFull() and not POOL.isInBurstMode:
        connection.close()
      else:
        POOL.connections.add(connection)

      echo "After Recycle: POOL size: " & $POOL.connections.len()


proc destroyConnectionPool*() =
  deinitLock(POOL.lock)


template withDbConn*(connection: untyped, body: untyped) =
  #Borrows a database connection, executes the body and then recycles the connection
  block: #ensures connection exists only within the scope of this block
    let connection: DbConn = borrowConnection()
    try:
      body
    finally:
      recycleConnection(connection)
