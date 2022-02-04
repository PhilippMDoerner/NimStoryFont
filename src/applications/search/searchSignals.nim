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

#Signals that create search entries
proc characterCreateSignal*(connection: DbConn, modelInstance: Character) =
  addSearchEntry(connection, modelInstance)

  if modelInstance.organization_id.isSome():
    let organization = getEntryById[Organization](modelInstance.organization_id.get())
    updateSearchEntryContent(connection, organization)

connect(SignalType.stPostCreate, Character, characterCreateSignal)

proc createCreatureSignal*(connection: DbConn, modelInstance: Creature) =
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Creature, createCreatureSignal)

proc itemCreateSignal*(connection: DbConn, modelInstance: Item) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Item, itemCreateSignal)

proc diaryEntryCreateSignal*(connection: DbConn, modelInstance: DiaryEntry) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, DiaryEntry, diaryEntryCreateSignal)

proc encounterCreateSignal*(connection: DbConn, modelInstance: Encounter) = 
  addSearchEntry(connection, modelInstance)

  let diaryentry: DiaryEntry = getEntryById[DiaryEntry](modelInstance.diaryentry_id)
  updateSearchEntryContent(connection, diaryentry)

connect(SignalType.stPostCreate, Encounter, encounterCreateSignal)

proc locationCreateSignal*(connection: DbConn, modelInstance: Location) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Location, locationCreateSignal)

proc mapCreateSignal*(connection: DbConn, modelInstance: Map) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Map, mapCreateSignal)

proc markerCreateSignal*(connection: DbConn, modelInstance: Marker) =
  let mapWithMarker: Map = getEntryById[Map](modelInstance.map_id)
  updateSearchEntryContent(connection, mapWithMarker)

connect(SignalType.stPostCreate, Marker, markerCreateSignal)

proc createOrganizationSearchEntry*(connection: DbConn, modelInstance: Organization) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Organization, createOrganizationSearchEntry)

proc createQuestSearchEntry*(connection: DbConn, modelInstance: Quest) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Quest, createQuestSearchEntry)

proc sessionAudioCreateSignal*(connection: DbConn, modelInstance: SessionAudio) = 
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, SessionAudio, sessionAudioCreateSignal)

proc timestampCreateSignal*(connection: DbConn, modelInstance: Timestamp) =
  let sessionAudioEntryWithTimestamp = getEntryById[SessionAudio](modelInstance.session_audio_id)
  updateSearchEntryContent(connection, sessionAudioEntryWithTimestamp)

connect(SignalType.stPostCreate, Timestamp, timestampCreateSignal)

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

