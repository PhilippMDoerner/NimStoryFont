import norm/[model, pragmas]
import ../../applicationSettings
import ../../applicationConstants
import ../character/characterModel
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults

type PlayerClass* {.defaults, tableName: PLAYERCLASS_TABLE.} = ref object of Model
    name*: string = ""
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
implDefaults(PlayerClass)
proc newModel*(T: typedesc[PlayerClass]): PlayerClass = newPlayerClass()


type PlayerClassConnectionRead* {.defaults, tableName: CHARACTER_PLAYERCLASS_TABLE.} = ref object of Model
    player_class_id*: PlayerClass = newModel(PlayerClass)
    character_id* {.fk: Character.}: int64 = MODEL_INIT_ID
implDefaults(PlayerClassConnectionRead)
proc newModel*(T: typedesc[PlayerClassConnectionRead]): PlayerClassConnectionRead = newPlayerClassConnectionRead()


type PlayerClassConnection* {.defaults, tableName: CHARACTER_PLAYERCLASS_TABLE.} = ref object of Model
    character_id*: int64 = MODEL_INIT_ID
    player_class_id*: int64 = MODEL_INIT_ID
implDefaults(PlayerClassConnection)
proc newModel*(T: typedesc[PlayerClassConnection]): PlayerClassConnection = newPlayerClassConnection()

