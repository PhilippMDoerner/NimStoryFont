import itemService

proc `$`*(model: Item | ItemRead | ItemOverview): string = 
    result = model.name