import norm/[model, pragmas]
import ../encounter/encounterModel
import ../../applicationSettings
import ../../applicationConstants
import characterModel
import constructor/defaults

type CharacterEncounterConnection* {.defaults, tableName: ENCOUNTER_CHARACTER_TABLE.} = ref object of Model
    character_id* {.fk: Character.}: int64 = MODEL_INIT_ID
    encounter_id* {.fk: Encounter.}: int64 = MODEL_INIT_ID

implDefaults(CharacterEncounterConnection, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type CharacterEncounterRead*  {.defaults, readOnly, tableName: ENCOUNTER_CHARACTER_TABLE.} = ref object of Model
    encounter_id*: EncounterRead = new(EncounterRead)
    character_id*: Character = new(Character)

implDefaults(CharacterEncounterRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
