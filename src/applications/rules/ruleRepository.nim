import ruleModel
import ../base_generics/genericArticleRepository

proc getRuleById*(ruleId: int64): Rule =
    result = getEntryById[Rule](ruleId)
