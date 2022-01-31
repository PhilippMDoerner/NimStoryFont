import tinypool
import std/db_sqlite


template withDbTransaction*(connection: untyped, body: untyped) =
  block: #ensures connection exists only within the scope of this block
    var connection: DbConn = borrowConnection()

    connection.exec(sql"BEGIN")
    try:
      body
      db.exec(sql"COMMIT")
    
    except:
      #If anything errors out, roll back the transaction and reraise the error
      db.exec(sql"ROLLBACK")
      raise

    finally:
      recycleConnection(connection)
