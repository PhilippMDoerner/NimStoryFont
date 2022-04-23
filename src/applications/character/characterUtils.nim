import characterModel
import std/[options, strformat, sugar]
import characterEncounterModel
import ../genericArticleRepository

proc `$`*(character: CharacterRead | Character): string =
    let titleString = character.title.map(title => fmt"{title} - ").get("")
    result.add(titleString)
    result.add(character.name)
    if not character.alive:
        result.add(" (†)")  

proc campaign_id*(entry: CharacterEncounterConnection): int64 =
    result = getEntryById(entry.character_id, Character).campaign_id