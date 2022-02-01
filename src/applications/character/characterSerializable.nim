import characterModel
import ../item/itemModel
import ../encounter/encounterModel
import ../image/imageModel
import ../playerclass/playerClassModel


type CharacterSerializable* = ref object
    character*: CharacterRead
    images*: seq[Image]
    encounters*: seq[EncounterRead]
    items*: seq[ItemOverview]
    playerClassConnections*: seq[PlayerClass]
