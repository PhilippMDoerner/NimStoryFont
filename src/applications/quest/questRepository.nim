import questModel
import ../base_generics/genericArticleRepository

export questModel

proc getQuestById*(questId: int64): Quest =
    result = getEntryById[Quest](questId)

