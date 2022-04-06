import ruleModel
import norm/sqlite
import ../genericArticleRepository

type RuleRead* = Rule
type RuleSerializable* = RuleRead


proc serializeRuleRead*(connection: DbConn, entry: RuleRead): RuleSerializable =
    result = entry

proc serializeRule*(connection: DbConn, entry: Rule): RuleSerializable =
    let fullEntry = connection.getEntryById(entry.id, RuleRead)
    result = connection.serializeRuleRead(fullEntry)