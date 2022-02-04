import searchRepository
import ../core/[signalSystem]
import ../character/characterModel
import ../creature/creatureModel
import ../item/itemModel
import ../diaryentry/[diaryEntryUtils, diaryEntryModel]
import ../encounter/[encounterUtils, encounterModel]
import std/[typetraits, strformat, db_sqlite]

export encounterUtils #So that "addSearchEntry" can query campaign_id properly
export diaryEntryUtils #So that "addSearchEntry" can query campaign_id properly

proc createCharacterSearchEntry*(connection: DbConn, modelInstance: Character) =
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Character, createCharacterSearchEntry)

proc createCreatureSearchEntry*(connection: DbConn, modelInstance: Creature) =
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Creature, createCreatureSearchEntry)

proc createItemSearchEntry*(connection: DbConn, modelInstance: Item) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Item, createItemSearchEntry)

proc createDiaryEntrySearchEntry*(connection: DbConn, modelInstance: DiaryEntry) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, DiaryEntry, createDiaryEntrySearchEntry)

proc createEncounterSearchEntry*(connection: DbConn, modelInstance: Encounter) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Encounter, createEncounterSearchEntry)

