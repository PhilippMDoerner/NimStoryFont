import characterModel
import std/strformat
import characterEncounterModel
import ../genericArticleRepository

proc `$`*(character: CharacterRead | Character): string =
    result.add(fmt "{character.name}")
    if character.alive:
        result.add(" (†)")  

proc campaign_id*(entry: CharacterEncounterConnection): int64 =
    result = getEntryById(entry.character_id, Character).campaign_id