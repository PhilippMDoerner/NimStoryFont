import norm/[model, pragmas]
import ../encounter/encounterModel
import ../../applicationSettings
import ../../applicationConstants
import characterModel
import constructor/defaults

type CharacterEncounterConnection* {.defaults, tableName: ENCOUNTER_CHARACTER_TABLE.} = ref object of Model
    character_id*: int64 = MODEL_INIT_ID
    encounter_id*: int64 = MODEL_INIT_ID

implDefaults(CharacterEncounterConnection)
proc newModel*(T: typedesc[CharacterEncounterConnection]): CharacterEncounterConnection =
    result = newCharacterEncounterConnection()
proc newTableModel*(T: typedesc[CharacterEncounterConnection]): CharacterEncounterConnection =
    result = newCharacterEncounterConnection()


type CharacterEncounterRead*  {.defaults, tableName: ENCOUNTER_CHARACTER_TABLE.} = ref object of Model
    encounter_id*: EncounterRead = newModel(EncounterRead)
    character_id* {.fk: Character.}: int64 = MODEL_INIT_ID

implDefaults(CharacterEncounterRead)
proc newModel*(T: typedesc[CharacterEncounterRead]): CharacterEncounterRead =
    result = newCharacterEncounterRead()
