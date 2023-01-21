import norm/[pool, sqlite]
import std/[logging, sugar]

var SQLITE_POOL*: Pool[DbConn]

proc initPool*(databasePath: string, size: int) =
  SQLITE_POOL = newPool[DbConn](
    size, 
    () => open(databasePath, "", "", ""), 
    pepExtend
  )

  debug fmt"Created pool with '{$size}' connections to '{databasePath}'"

template withDbConn*(connection: untyped, body: untyped) =
  block: #ensures connection exists only within the scope of this block
    var connection: DbConn = SQLITE_POOL.pop()

    try:
      {.cast(gcsafe).}:
        body
 
    finally:
      SQLITE_POOL.add(connection)

template withDbTransaction*(connection: untyped, body: untyped) =
  block: #ensures connection exists only within the scope of this block
    var connection: DbConn = SQLITE_POOL.pop()

    {.cast(gcsafe).}:
      exec(connection, sql"BEGIN")
    try:
      {.cast(gcsafe).}:
        body
      {.cast(gcsafe).}:
        exec(connection, sql"COMMIT")
    
    except:
      #If anything errors out, roll back the transaction and reraise the error
      {.cast(gcsafe).}:
        exec(connection, sql"ROLLBACK")
      raise

    finally:
      SQLITE_POOL.add(connection)
