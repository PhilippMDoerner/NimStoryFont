import std/strformat
import ./questService

proc `$`*(model: Quest | QuestRead): string =
  result.add(fmt "{model.status} - {model.name}")
