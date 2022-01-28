import questModel
import ../base_generics/genericArticleRepository

proc getQuestById*(questId: int64): Quest =
    result = getEntryById[Quest](questId)

