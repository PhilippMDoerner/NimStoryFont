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
implDefaults(PlayerClass, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type PlayerClassConnectionRead* {.defaults, readOnly, tableName: CHARACTER_PLAYERCLASS_TABLE.} = ref object of Model
    player_class_id*: PlayerClass = new(PlayerClass)
    character_id* {.fk: Character.}: int64 = MODEL_INIT_ID
implDefaults(PlayerClassConnectionRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type PlayerClassConnection* {.defaults, tableName: CHARACTER_PLAYERCLASS_TABLE.} = ref object of Model
    character_id* {.fk: Character.}: int64 = MODEL_INIT_ID
    player_class_id* {.fk: PlayerClass.}: int64 = MODEL_INIT_ID
implDefaults(PlayerClassConnection, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


