import ./ruleModel

proc `$`*(model: Rule | RuleRead): string =
  result = model.name
