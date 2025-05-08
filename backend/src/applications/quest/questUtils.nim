import questService
import std/strformat

proc `$`*(model: Quest | QuestRead): string =
  result.add(fmt "{model.status} - {model.name}")
