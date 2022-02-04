import searchRepository
import ../core/[signalSystem]
import ../character/characterModel
import ../creature/creatureModel
import ../item/itemModel
import ../diaryentry/[diaryEntryUtils, diaryEntryModel]
import ../encounter/[encounterUtils, encounterModel]
import ../location/locationModel
import ../map/mapModel
import ../organization/organizationModel
import ../quest/questModel
import ../sessionaudio/[sessionaudioUtils, sessionaudioModel]
import ../spell/spellModel
import ../rules/ruleModel
import std/[typetraits, strformat, db_sqlite]

export encounterUtils #So that "addSearchEntry" can query campaign_id properly
export diaryEntryUtils #So that "addSearchEntry" can query campaign_id properly
export sessionaudioUtils

#Signals that create search entries
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

proc createLocationSearchEntry*(connection: DbConn, modelInstance: Location) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Location, createLocationSearchEntry)

proc createMapSearchEntry*(connection: DbConn, modelInstance: Map) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Map, createMapSearchEntry)

proc createOrganizationSearchEntry*(connection: DbConn, modelInstance: Organization) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Organization, createOrganizationSearchEntry)

proc createQuestSearchEntry*(connection: DbConn, modelInstance: Quest) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Quest, createQuestSearchEntry)

proc createSessionAudioSearchEntry*(connection: DbConn, modelInstance: SessionAudio) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, SessionAudio, createSessionAudioSearchEntry)

proc createSpellSearchEntry*(connection: DbConn, modelInstance: Spell) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Spell, createSpellSearchEntry)

proc createRuleSearchEntry*(connection: DbConn, modelInstance: Rule) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Rule, createRuleSearchEntry)


#Signals that update search entries
proc updateCharacterSearchEntry*(connection: DbConn, modelInstance: Character) =
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Character, updateCharacterSearchEntry)

proc updateCreatureSearchEntry*(connection: DbConn, modelInstance: Creature) =
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Creature, updateCreatureSearchEntry)

proc updateItemSearchEntry*(connection: DbConn, modelInstance: Item) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Item, updateItemSearchEntry)

proc updateDiaryEntrySearchEntry*(connection: DbConn, modelInstance: DiaryEntry) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, DiaryEntry, updateDiaryEntrySearchEntry)

proc updateEncounterSearchEntry*(connection: DbConn, modelInstance: Encounter) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Encounter, updateEncounterSearchEntry)

proc updateLocationSearchEntry*(connection: DbConn, modelInstance: Location) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Location, updateLocationSearchEntry)

proc updateMapSearchEntry*(connection: DbConn, modelInstance: Map) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Map, updateMapSearchEntry)

proc updateOrganizationSearchEntry*(connection: DbConn, modelInstance: Organization) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Organization, updateOrganizationSearchEntry)

proc updateQuestSearchEntry*(connection: DbConn, modelInstance: Quest) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Quest, updateQuestSearchEntry)

proc updateSessionAudioSearchEntry*(connection: DbConn, modelInstance: SessionAudio) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, SessionAudio, updateSessionAudioSearchEntry)

proc updateSpellSearchEntry*(connection: DbConn, modelInstance: Spell) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Spell, updateSpellSearchEntry)

proc updateRuleSearchEntry*(connection: DbConn, modelInstance: Rule) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Rule, updateRuleSearchEntry)

