import searchService
import ../genericArticleRepository
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
import std/[typetraits, strformat, options]

export encounterUtils #So that "addSearchEntry" can query campaign_id properly
export diaryEntryUtils #So that "addSearchEntry" can query campaign_id properly
export sessionaudioUtils

## This is a list of all search signal procs
## These procs are about entering, updating and deleting entries from the FTS5 search table in sqlite
## in order to keep it in sync with the rest of the content in the database. 
## The only Model types that should have entries in that table are the ones summarized in the `Article` type
## (see searchModel.nim).
## All other Models (e.g. Marker, Timestamp) are only here because the data they contain influences the 
## search entry content of an Article Model.
## 
## After defining these procs, they are then connected to their designated model and an execution 
## time (SignalType) is assigned to them.

#CHARACTER Signals
proc updateCharacterAssociatedEntries(connection: DbConn, modelInstance: Character) =
  if modelInstance.organization_id.isSome():
    let organization = getEntryById[Organization](modelInstance.organization_id.get())
    updateSearchEntryContent(connection, organization)

  let questsWhereCharacterIsGiver: seq[Quest] = getManyFromOne(modelInstance, Quest, "giver_id")
  for quest in questsWhereCharacterIsGiver:
    updateSearchEntryContent(connection, quest)

  let questsWhereCharacterIsTaker: seq[Quest] = getManyFromOne(modelInstance, Quest, "taker_id")
  for quest in questsWhereCharacterIsTaker:
    updateSearchEntryContent(connection, quest)

proc characterCreateSignal*(connection: DbConn, modelInstance: Character) =
  addSearchEntry(connection, modelInstance)
  updateCharacterAssociatedEntries(connection, modelInstance)

proc characterUpdateSignal*(connection: DbConn, modelInstance: Character) =
  updateSearchEntryContent(connection, modelInstance)
  updateCharacterAssociatedEntries(connection, modelInstance)

proc characterDeleteSignal*(connection: DbConn, modelInstance: Character) =
  deleteSearchEntry(connection, modelInstance)
  updateCharacterAssociatedEntries(connection, modelInstance)

connect(SignalType.stPostCreate, Character, characterCreateSignal)
connect(SignalType.stPostUpdate, Character, characterUpdateSignal)
connect(SignalType.stPostDelete, Character, characterDeleteSignal)



#CREATURE
proc creatureCreateSignal*(connection: DbConn, modelInstance: Creature) =
  addSearchEntry(connection, modelInstance)

proc creatureUpdateSignal*(connection: DbConn, modelInstance: Creature) =
  updateSearchEntryContent(connection, modelInstance)

proc creatureDeleteSignal*(connection: DbConn, modelInstance: Creature) =
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostUpdate, Creature, creatureUpdateSignal)
connect(SignalType.stPostCreate, Creature, creatureCreateSignal)
connect(SignalType.stPostDelete, Creature, creatureDeleteSignal)



#ITEM
proc itemCreateSignal*(connection: DbConn, modelInstance: Item) = 
  addSearchEntry(connection, modelInstance)

proc itemUpdateSignal*(connection: DbConn, modelInstance: Item) = 
  updateSearchEntryContent(connection, modelInstance)

proc itemDeleteSignal*(connection: DbConn, modelInstance: Item) =
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostDelete, Item, itemDeleteSignal)
connect(SignalType.stPostUpdate, Item, itemUpdateSignal)
connect(SignalType.stPostCreate, Item, itemCreateSignal)



#DIARYENTRY
proc diaryEntryCreateSignal*(connection: DbConn, modelInstance: DiaryEntry) = 
  addSearchEntry(connection, modelInstance)

proc diaryEntryUpdateSignal*(connection: DbConn, modelInstance: DiaryEntry) = 
  updateSearchEntryContent(connection, modelInstance)

proc diaryEntryDeleteSignal*(connection: DbConn, modelInstance: DiaryEntry) =
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostDelete, DiaryEntry, diaryEntryDeleteSignal)
connect(SignalType.stPostUpdate, DiaryEntry, diaryEntryUpdateSignal)
connect(SignalType.stPostCreate, DiaryEntry, diaryEntryCreateSignal)



#ENCOUNTER
proc updateEncounterAssociatedEntries(connection: DbConn, modelInstance: Encounter) =
  let diaryentry: DiaryEntry = getEntryById[DiaryEntry](modelInstance.diaryentry_id)
  updateSearchEntryContent(connection, diaryentry)

proc encounterCreateSignal*(connection: DbConn, modelInstance: Encounter) = 
  addSearchEntry(connection, modelInstance)
  updateEncounterAssociatedEntries(connection, modelInstance)

proc encounterUpdateSignal*(connection: DbConn, modelInstance: Encounter) = 
  updateSearchEntryContent(connection, modelInstance)
  updateEncounterAssociatedEntries(connection, modelInstance)

proc encounterDeleteSignal*(connection: DbConn, modelInstance: Encounter) =
  deleteSearchEntry(connection, modelInstance)
  updateEncounterAssociatedEntries(connection, modelInstance)

connect(SignalType.stPostDelete, Encounter, encounterDeleteSignal)
connect(SignalType.stPostUpdate, Encounter, encounterUpdateSignal)
connect(SignalType.stPostCreate, Encounter, encounterCreateSignal)



#LOCATION
proc updateLocationAssociatedEntries(connection: DbConn, modelInstance: Location) =
  let mapsWithLocation: seq[Map] = getManyToMany(modelInstance, MarkerRead, Map)
  for map in mapsWithLocation:
    updateSearchEntryContent(connection, map)
  
  let organizationWithHeadquarterInLocation: seq[Organization] = getManyFromOne(modelInstance, Organization)
  for organization in organizationWithHeadquarterInLocation:
    updateSearchEntryContent(connection, organization)
  
  let encountersInLocation: seq[Encounter] = getManyFromOne(modelInstance, Encounter)
  for encounter in encountersInLocation:
    updateSearchEntryContent(connection, encounter)

proc locationCreateSignal*(connection: DbConn, modelInstance: Location) = 
  addSearchEntry(connection, modelInstance)

proc locationUpdateSignal*(connection: DbConn, modelInstance: Location) = 
  updateSearchEntryContent(connection, modelInstance)
  updateLocationAssociatedEntries(connection, modelInstance)

proc locationDeleteSignal*(connection: DbConn, modelInstance: Location) = 
  deleteSearchEntry(connection, modelInstance)
  updateLocationAssociatedEntries(connection, modelInstance)

connect(SignalType.stPostDelete, Location, locationDeleteSignal)
connect(SignalType.stPostUpdate, Location, locationUpdateSignal)
connect(SignalType.stPostCreate, Location, locationCreateSignal)



#MAP
proc mapCreateSignal*(connection: DbConn, modelInstance: Map) = 
  addSearchEntry(connection, modelInstance)

proc mapUpdateSignal*(connection: DbConn, modelInstance: Map) = 
  updateSearchEntryContent(connection, modelInstance)

proc mapDeleteSignal*(connection: DbConn, modelInstance: Map) = 
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostDelete, Map, mapDeleteSignal)
connect(SignalType.stPostUpdate, Map, mapUpdateSignal)
connect(SignalType.stPostCreate, Map, mapCreateSignal)



#MARKER
proc markerSignal*(connection: DbConn, modelInstance: Marker) =
  let mapWithMarker: Map = getEntryById[Map](modelInstance.map_id)
  updateSearchEntryContent(connection, mapWithMarker)

connect(SignalType.stPostCreate, Marker, markerSignal)
connect(SignalType.stPostUpdate, Marker, markerSignal)
connect(SignalType.stPostDelete, Marker, markerSignal)



#ORGANIZATION
proc organizationCreateSignal*(connection: DbConn, modelInstance: Organization) = 
  addSearchEntry(connection, modelInstance)

proc organizationUpdateSignal*(connection: DbConn, modelInstance: Organization) = 
  updateSearchEntryContent(connection, modelInstance)

proc organizationDeleteSignal*(connection: DbConn, modelInstance: Organization) = 
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostDelete, Organization, organizationDeleteSignal)
connect(SignalType.stPostUpdate, Organization, organizationUpdateSignal)
connect(SignalType.stPostCreate, Organization, organizationCreateSignal)



#QUEST
proc questCreateSignal*(connection: DbConn, modelInstance: Quest) = 
  addSearchEntry(connection, modelInstance)

proc questUpdateSignal*(connection: DbConn, modelInstance: Quest) = 
  updateSearchEntryContent(connection, modelInstance)

proc questDeleteSignal*(connection: DbConn, modelInstance: Quest) = 
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostDelete, Quest, questDeleteSignal)
connect(SignalType.stPostUpdate, Quest, questUpdateSignal)
connect(SignalType.stPostCreate, Quest, questCreateSignal)



#SESSIONAUDIO
proc sessionAudioCreateSignal*(connection: DbConn, modelInstance: SessionAudio) = 
  addSearchEntry(connection, modelInstance)

proc sessionAudioUpdateSignal*(connection: DbConn, modelInstance: SessionAudio) = 
  updateSearchEntryContent(connection, modelInstance)

proc sessionAudioDeleteSignal*(connection: DbConn, modelInstance: SessionAudio) =
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostDelete, SessionAudio, sessionAudioDeleteSignal)
connect(SignalType.stPostUpdate, SessionAudio, sessionAudioUpdateSignal)
connect(SignalType.stPostCreate, SessionAudio, sessionAudioCreateSignal)



#TIMESTAMP
proc timestampSignal*(connection: DbConn, modelInstance: Timestamp) =
  let sessionAudioEntryWithTimestamp = getEntryById[SessionAudio](modelInstance.session_audio_id)
  updateSearchEntryContent(connection, sessionAudioEntryWithTimestamp)

connect(SignalType.stPostCreate, Timestamp, timestampSignal)
connect(SignalType.stPostDelete, Timestamp, timestampSignal)



#SPELL
proc spellCreateSignal*(connection: DbConn, modelInstance: Spell) = 
  addSearchEntry(connection, modelInstance)

proc spellUpdateSignal*(connection: DbConn, modelInstance: Spell) = 
  updateSearchEntryContent(connection, modelInstance)

proc spellDeleteSignal*(connection: DbConn, modelInstance: Spell) = 
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostDelete, Spell, spellDeleteSignal)
connect(SignalType.stPostUpdate, Spell, spellUpdateSignal)
connect(SignalType.stPostCreate, Spell, spellCreateSignal)



#RULE
proc ruleCreateSignal*(connection: DbConn, modelInstance: Rule) = 
  addSearchEntry(connection, modelInstance)

proc ruleUpdateSignal*(connection: DbConn, modelInstance: Rule) = 
  updateSearchEntryContent(connection, modelInstance)

proc ruleDeleteSignal*(connection: DbConn, modelInstance: Rule) = 
  deleteSearchEntry(connection, modelInstance)

connect(SignalType.stPostDelete, Rule, ruleDeleteSignal)
connect(SignalType.stPostUpdate, Rule, ruleUpdateSignal)
connect(SignalType.stPostCreate, Rule, ruleCreateSignal)

