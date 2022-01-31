import itemRepository

proc `$`*(model: Item | ItemRead | ItemOverview): string = 
    result = model.name