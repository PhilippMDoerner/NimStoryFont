import tinypool
import std/db_sqlite
import norm/sqlite

type MyDbConn* = sqlite.DbConn | db_sqlite.DbConn

template withDbTransaction*(connection: untyped, body: untyped) =
  block: #ensures connection exists only within the scope of this block
    var connection: db_sqlite.DbConn = borrowConnection()

    db_sqlite.exec(connection, sql"BEGIN")
    try:
      {.cast(gcsafe).}:
        body
      db_sqlite.exec(connection, sql"COMMIT")
    
    except:
      #If anything errors out, roll back the transaction and reraise the error
      db_sqlite.exec(connection, sql"ROLLBACK")
      raise

    finally:
      recycleConnection(connection)
