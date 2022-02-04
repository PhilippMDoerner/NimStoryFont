import searchRepository
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

#CHARACTER Signals
proc characterCreateSignal*(connection: DbConn, modelInstance: Character) =
  addSearchEntry(connection, modelInstance)

  if modelInstance.organization_id.isSome():
    let organization = getEntryById[Organization](modelInstance.organization_id.get())
    updateSearchEntryContent(connection, organization)

proc characterUpdateSignal*(connection: DbConn, modelInstance: Character) =
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostCreate, Character, characterCreateSignal)
connect(SignalType.stPostUpdate, Character, characterUpdateSignal)



#CREATURE
proc creatureCreateSignal*(connection: DbConn, modelInstance: Creature) =
  addSearchEntry(connection, modelInstance)

proc creatureUpdateSignal*(connection: DbConn, modelInstance: Creature) =
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Creature, creatureUpdateSignal)
connect(SignalType.stPostCreate, Creature, creatureCreateSignal)



#ITEM
proc itemCreateSignal*(connection: DbConn, modelInstance: Item) = 
  addSearchEntry(connection, modelInstance)

proc itemUpdateSignal*(connection: DbConn, modelInstance: Item) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Item, itemUpdateSignal)
connect(SignalType.stPostCreate, Item, itemCreateSignal)



#DIARYENTRY
proc diaryEntryCreateSignal*(connection: DbConn, modelInstance: DiaryEntry) = 
  addSearchEntry(connection, modelInstance)

proc diaryEntryUpdateSignal*(connection: DbConn, modelInstance: DiaryEntry) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, DiaryEntry, diaryEntryUpdateSignal)
connect(SignalType.stPostCreate, DiaryEntry, diaryEntryCreateSignal)



#ENCOUNTER
proc encounterCreateSignal*(connection: DbConn, modelInstance: Encounter) = 
  addSearchEntry(connection, modelInstance)

  let diaryentry: DiaryEntry = getEntryById[DiaryEntry](modelInstance.diaryentry_id)
  updateSearchEntryContent(connection, diaryentry)

proc encounterUpdateSignal*(connection: DbConn, modelInstance: Encounter) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Encounter, encounterUpdateSignal)
connect(SignalType.stPostCreate, Encounter, encounterCreateSignal)



#LOCATION
proc locationCreateSignal*(connection: DbConn, modelInstance: Location) = 
  addSearchEntry(connection, modelInstance)

proc locationUpdateSignal*(connection: DbConn, modelInstance: Location) = 
  updateSearchEntryContent(connection, modelInstance)

  let mapsWithLocation: seq[Map] = getManyToMany(modelInstance, MarkerRead, Map)
  for map in mapsWithLocation:
    updateSearchEntryContent(connection, map)
  
  let organizationWithHeadquarterInLocation: seq[Organization] = getManyFromOne(modelInstance, Organization)
  for organization in organizationWithHeadquarterInLocation:
    updateSearchEntryContent(connection, organization)
  
  let encountersInLocation: seq[Encounter] = getManyFromOne(modelInstance, Encounter)
  for encounter in encountersInLocation:
    updateSearchEntryContent(connection, encounter)

connect(SignalType.stPostUpdate, Location, locationUpdateSignal)
connect(SignalType.stPostCreate, Location, locationCreateSignal)



#MAP
proc mapCreateSignal*(connection: DbConn, modelInstance: Map) = 
  addSearchEntry(connection, modelInstance)

proc mapUpdateSignal*(connection: DbConn, modelInstance: Map) = 
  updateSearchEntryContent(connection, modelInstance)

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

connect(SignalType.stPostUpdate, Organization, organizationUpdateSignal)
connect(SignalType.stPostCreate, Organization, organizationCreateSignal)



#QUEST
proc questCreateSignal*(connection: DbConn, modelInstance: Quest) = 
  addSearchEntry(connection, modelInstance)

proc questUpdateSignal*(connection: DbConn, modelInstance: Quest) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Quest, questUpdateSignal)
connect(SignalType.stPostCreate, Quest, questCreateSignal)



#SESSIONAUDIO
proc sessionAudioCreateSignal*(connection: DbConn, modelInstance: SessionAudio) = 
  addSearchEntry(connection, modelInstance)

proc updateSessionAudioSearchEntry*(connection: DbConn, modelInstance: SessionAudio) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, SessionAudio, updateSessionAudioSearchEntry)
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

connect(SignalType.stPostUpdate, Spell, spellUpdateSignal)
connect(SignalType.stPostCreate, Spell, spellCreateSignal)



#RULE
proc ruleCreateSignal*(connection: DbConn, modelInstance: Rule) = 
  addSearchEntry(connection, modelInstance)

proc ruleUpdateSignal*(connection: DbConn, modelInstance: Rule) = 
  updateSearchEntryContent(connection, modelInstance)

connect(SignalType.stPostUpdate, Rule, ruleUpdateSignal)
connect(SignalType.stPostCreate, Rule, ruleCreateSignal)

