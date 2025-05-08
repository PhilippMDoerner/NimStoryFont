import ./mapService

proc `$`*(model: Map): string =
  result = model.name
