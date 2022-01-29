import sessionModel
import ../base_generics/genericArticleRepository

export sessionModel

proc getSessionById*(sessionId: int64): Session =
    result = getEntryById[Session](sessionId)
