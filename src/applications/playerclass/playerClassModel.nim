import norm/[model, pragmas]
import ../../applicationSettings
import ../character/characterModel
import ../../utils/djangoDateTime/djangoDateTimeType


type PlayerClass* {.tableName: PLAYERCLASS_TABLE.} = ref object of Model
    name*: string
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime


type PlayerClassConnectionRead* {.tableName: CHARACTER_PLAYERCLASS_TABLE.} = ref object of Model
    player_class_id*: PlayerClass
    character_id* {.fk: Character.}: int64


type PlayerClassConnection* {.tableName: CHARACTER_PLAYERCLASS_TABLE.} = ref object of Model
    character_id*: int64
    player_class_id*: int64


proc newPlayerClass(
    name = "", 
    update_datetime = djangoDateTimeType.now(), 
    creation_datetime = djangoDateTimeType.now()
): PlayerClass =
    result = PlayerClass(
        name: name,
        update_datetime: update_datetime,
        creation_datetime: creation_datetime
    )


proc newPlayerClassConnection(character_id = -1, player_class_id = -1): PlayerClassConnection =
    result = PlayerClassConnection(character_id: character_id, player_class_id: player_class_id)


proc newPlayerClassConnectionRead(player_class_id = newPlayerClass()): PlayerClassConnectionRead =
    result = PlayerClassConnectionRead(player_class_id: player_class_id)


proc newModel*(T: typedesc[PlayerClassConnection]): PlayerClassConnection =
    result = newPlayerClassConnection()

proc newModel*(T: typedesc[PlayerClass]): PlayerClass =
    result = newPlayerClass()

proc newModel*(T: typedesc[PlayerClassConnectionRead]): PlayerClassConnectionRead =
    result = newPlayerClassConnectionRead()
