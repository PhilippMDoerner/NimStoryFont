import norm/[pool, sqlite]
import std/[logging, sugar, strformat]

var SQLITE_POOL*: Pool[DbConn]

proc initConnectionPool*(databasePath: string, size: int) =
  {.cast(gcsafe).}:
    SQLITE_POOL = newPool[DbConn](
      size, 
      () => open(databasePath, "", "", ""), 
      pepExtend
    )

    debug fmt"Created pool with '{$size}' connections to '{databasePath}'"

proc destroyConnectionPool*() =
  {.cast(gcsafe).}:
    close SQLITE_POOL

template withDbConn*(connection: untyped, body: untyped) =
  {.cast(gcsafe).}:
    block: #ensures connection exists only within the scope of this block
      var connection: DbConn = SQLITE_POOL.pop()

      try:
          body
  
      finally:
        SQLITE_POOL.add(connection)

template withDbTransaction*(connection: untyped, body: untyped) =
  {.cast(gcsafe).}:
    block: #ensures connection exists only within the scope of this block
      var connection: DbConn = SQLITE_POOL.pop()

      exec(connection, sql"BEGIN")
      try:
        body
        exec(connection, sql"COMMIT")
      
      except:
        #If anything errors out, roll back the transaction and reraise the error
        exec(connection, sql"ROLLBACK")
        raise

      finally:
        SQLITE_POOL.add(connection)
