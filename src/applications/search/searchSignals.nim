import searchRepository
import std/db_sqlite

proc postCreateSignal*(connection: DBConn, entry: Article) =
  addSearchEntry(connection, entry)