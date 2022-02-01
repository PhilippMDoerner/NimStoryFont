import ruleModel

proc `$`*(model: Rule): string =
    result = model.name