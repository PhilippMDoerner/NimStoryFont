import ruleModel
import ../genericArticleRepository

export ruleModel

proc getRuleById*(ruleId: int64): Rule =
    result = getEntryById[Rule](ruleId)
