import sessionModel
import ../genericArticleRepository
import tinypool

export genericArticleRepository
export sessionModel

proc getSessionById*(sessionId: int64): Session =
    result = getEntryById(sessionId, Session)
