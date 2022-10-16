import tinypool/sqlitePool
import norm/sqlite

export sqlitePool

template withDbTransaction*(connection: untyped, body: untyped) =
  block: #ensures connection exists only within the scope of this block
    var connection: DbConn = borrowConnection()

    exec(connection, sql"BEGIN")
    try:
      body
      exec(connection, sql"COMMIT")
    
    except:
      #If anything errors out, roll back the transaction and reraise the error
      exec(connection, sql"ROLLBACK")
      raise

    finally:
      recycleConnection(connection)
