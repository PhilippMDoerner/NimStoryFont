import characterModel
import std/strformat

proc `$`*(character: CharacterRead | Character): string =
    result.add(fmt "{character.name}")
    if character.alive:
        result.add(" (†)")  