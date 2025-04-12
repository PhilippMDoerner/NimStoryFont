import norm/[pool, sqlite]
import std/[logging, strformat]

var SQLITE_POOL*: Pool[DbConn]

type DuplicateEntryError* = object of DbError


const ENABLE_FK_PRAGMA_CHECK = "PRAGMA foreign_keys=on"

proc initConnectionPool*(databasePath: string, size: int) =
  {.cast(gcsafe).}:
    SQLITE_POOL = newPool[DbConn](
      size,
      proc(): DbConn {.closure.} = open(databasePath, "", "", ""),
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
      exec(connection, sql ENABLE_FK_PRAGMA_CHECK)

      try:
          body
  
      finally:
        SQLITE_POOL.add(connection)

template withDbTransaction*(connection: untyped, body: untyped) =
  {.cast(gcsafe).}:
    block: #ensures connection exists only within the scope of this block
      var connection: DbConn = SQLITE_POOL.pop()

      exec(connection, sql ENABLE_FK_PRAGMA_CHECK)
      exec(connection, sql"BEGIN")
      try:
        body
        exec(connection, sql"COMMIT")
      
      except CatchableError:
        #If anything errors out, roll back the transaction and reraise the error
        exec(connection, sql"ROLLBACK")
        raise

      finally:
        SQLITE_POOL.add(connection)
