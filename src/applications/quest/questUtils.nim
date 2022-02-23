import questService
import std/strformat

proc `$`*(model: Quest): string =
  result.add(fmt "{model.status} - {model.name}")