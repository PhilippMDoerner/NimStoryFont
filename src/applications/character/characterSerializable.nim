import characterModel
import ../item/itemModel
import ../organization/organizationModel
import ../encounter/encounterModel
import ../location/locationModel
import ../image/imageModel
import ../playerclass/playerClassModel
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType


type CharacterSerializable* = ref object
    character*: CharacterRead
    images*: seq[Image]
    encounters*: seq[EncounterRead]
    items*: seq[ItemOverview]
    playerClassConnections*: seq[PlayerClass]
