import ruleModel
import ../base_generics/genericArticleRepository

export ruleModel

proc getRuleById*(ruleId: int64): Rule =
    result = getEntryById[Rule](ruleId)
