import norm/[model, pragmas]
import encounterModel
import ../../applicationSettings
import ../character/characterModel

type CharacterEncounterConnection* {.tableName: ENCOUNTER_CHARACTER_TABLE.} = ref object of Model
    character_id*: int64
    encounter_id*: int64

proc newCharacterEncounterConnection(character_id = -1, encounter_id = -1): CharacterEncounterConnection =
    result = CharacterEncounterConnection(
        character_id: character_id,
        encounter_id: encounter_id
    )

proc newModel*(T: typedesc[CharacterEncounterConnection]): CharacterEncounterConnection =
    result = newCharacterEncounterConnection()


proc newTableModel*(T: typedesc[CharacterEncounterConnection]): CharacterEncounterConnection =
    result = newCharacterEncounterConnection()


type CharacterEncounterRead*  {.tableName: ENCOUNTER_CHARACTER_TABLE.} = ref object of Model
    encounter_id*: EncounterRead
    character_id* {.fk: Character.}: int64


proc newCharacterEncounterRead(encounter_id = newModel(EncounterRead)): CharacterEncounterRead =
    result = CharacterEncounterRead(encounter_id: encounter_id)


proc newModel*(T: typedesc[CharacterEncounterRead]): CharacterEncounterRead =
    result = newCharacterEncounterRead()
