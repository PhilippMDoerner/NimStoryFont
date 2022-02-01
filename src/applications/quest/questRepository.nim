import questModel
import ../genericArticleRepository

export questModel

proc getQuestById*(questId: int64): Quest =
    result = getEntryById[Quest](questId)

