import sessionModel
import norm/sqlite
import ../genericArticleRepository

type SessionSerializable* = SessionRead


proc serializeSessionRead*(connection: DbConn, entry: SessionRead): SessionSerializable =
    result = entry

proc serializeSession*(connection: DbConn, entry: Session): SessionSerializable =
    let fullEntry = connection.getEntryById(entry.id, SessionRead)
    result = connection.serializeSessionRead(fullEntry)

