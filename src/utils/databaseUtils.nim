import tinypool/sqlitePool
import norm/sqlite

export sqlitePool

template withDbTransaction*(connection: untyped, body: untyped) =
  block: #ensures connection exists only within the scope of this block
    var connection: DbConn = borrowConnection()

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
      recycleConnection(connection)
