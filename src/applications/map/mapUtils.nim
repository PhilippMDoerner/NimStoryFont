import mapRepository

proc `$`*(model: Map): string = 
    result = model.name