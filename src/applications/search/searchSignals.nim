import searchService
import ../genericArticleRepository
import ../core/[signalSystem]
import ../character/[characterService, characterModel, characterOrganizationModel]
import ../creature/creatureModel
import ../item/itemModel
import ../diaryentry/[diaryEntryUtils, diaryEntryModel]
import ../encounter/[encounterUtils, encounterModel]
import ../location/locationModel
import ../map/mapModel
import ../organization/organizationModel
import ../quest/questModel
import ../sessionaudio/[sessionaudioUtils, sessionaudioModel]
import ../sessionAudioTimestamp/timestampModel
import ../spell/spellModel
import ../rules/ruleModel
import ../mapMarker/markerModel
import std/[typetraits, strformat, options]
import ../../utils/databaseUtils

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
  let memberships: seq[OrganizationMembershipRead] = connection.getOrganizationMemberships(modelInstance.id, OrganizationMembershipRead)
  for membership in memberships:
    let organization: OrganizationRead = membership.organization_id
    updateSearchEntryContent(connection, organization)

  let questsWhereCharacterIsGiver: seq[Quest] = connection.getManyFromOne(modelInstance, Quest, "giver_id")
  for quest in questsWhereCharacterIsGiver:
    updateSearchEntryContent(connection, quest)

  let questsWhereCharacterIsTaker: seq[Quest] = connection.getManyFromOne(modelInstance, Quest, "taker_id")
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

proc connectCharacterSearchSignals() =
  connect(SignalType.stPostCreate, Character, characterCreateSignal)
  connect(SignalType.stPostUpdate, Character, characterUpdateSignal)
  connect(SignalType.stPreDelete, Character, characterDeleteSignal)

#CREATURE
proc creatureCreateSignal*(connection: DbConn, modelInstance: Creature) =
  addSearchEntry(connection, modelInstance)

proc creatureUpdateSignal*(connection: DbConn, modelInstance: Creature) =
  updateSearchEntryContent(connection, modelInstance)

proc creatureDeleteSignal*(connection: DbConn, modelInstance: Creature) =
  deleteSearchEntry(connection, modelInstance)

proc connectCreatureSearchSignals() =
  connect(SignalType.stPostUpdate, Creature, creatureUpdateSignal)
  connect(SignalType.stPostCreate, Creature, creatureCreateSignal)
  connect(SignalType.stPreDelete, Creature, creatureDeleteSignal)

#ITEM
proc itemCreateSignal*(connection: DbConn, modelInstance: Item) = 
  addSearchEntry(connection, modelInstance)

proc itemUpdateSignal*(connection: DbConn, modelInstance: Item) = 
  updateSearchEntryContent(connection, modelInstance)

proc itemDeleteSignal*(connection: DbConn, modelInstance: Item) =
  deleteSearchEntry(connection, modelInstance)

proc connectItemSearchSignals() =
  connect(SignalType.stPreDelete, Item, itemDeleteSignal)
  connect(SignalType.stPostUpdate, Item, itemUpdateSignal)
  connect(SignalType.stPostCreate, Item, itemCreateSignal)



#DIARYENTRY
proc diaryEntryCreateSignal*(connection: DbConn, modelInstance: DiaryEntry) = 
  addSearchEntry(connection, modelInstance)

proc diaryEntryUpdateSignal*(connection: DbConn, modelInstance: DiaryEntry) = 
  updateSearchEntryContent(connection, modelInstance)

proc diaryEntryDeleteSignal*(connection: DbConn, modelInstance: DiaryEntry) =
  deleteSearchEntry(connection, modelInstance)

proc connectDiaryEntrySearchSignals() =
  connect(SignalType.stPreDelete, DiaryEntry, diaryEntryDeleteSignal)
  connect(SignalType.stPostUpdate, DiaryEntry, diaryEntryUpdateSignal)
  connect(SignalType.stPostCreate, DiaryEntry, diaryEntryCreateSignal)



#ENCOUNTER
proc updateEncounterAssociatedEntries(connection: DbConn, modelInstance: Encounter) =
  let diaryentry: DiaryEntry = getEntryById(modelInstance.diaryentry_id, DiaryEntry)
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

proc connectEncounterSearchSignals() =
  connect(SignalType.stPreDelete, Encounter, encounterDeleteSignal)
  connect(SignalType.stPostUpdate, Encounter, encounterUpdateSignal)
  connect(SignalType.stPostCreate, Encounter, encounterCreateSignal)



#LOCATION
proc updateLocationAssociatedEntries(connection: DbConn, modelInstance: Location) =
  let mapsWithLocation: seq[MarkerMap] = getManyToMany(modelInstance, MarkerRead, MarkerMap)
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

proc connectLocationSearchSignals() =
  connect(SignalType.stPreDelete, Location, locationDeleteSignal)
  connect(SignalType.stPostUpdate, Location, locationUpdateSignal)
  connect(SignalType.stPostCreate, Location, locationCreateSignal)



#MAP
proc mapCreateSignal*(connection: DbConn, modelInstance: Map) = 
  addSearchEntry(connection, modelInstance)

proc mapUpdateSignal*(connection: DbConn, modelInstance: Map) = 
  updateSearchEntryContent(connection, modelInstance)

proc mapDeleteSignal*(connection: DbConn, modelInstance: Map) = 
  deleteSearchEntry(connection, modelInstance)

proc connectMapSearchSignals() =
  connect(SignalType.stPreDelete, Map, mapDeleteSignal)
  connect(SignalType.stPostUpdate, Map, mapUpdateSignal)
  connect(SignalType.stPostCreate, Map, mapCreateSignal)



#MARKER
proc markerSignal*(connection: DbConn, modelInstance: Marker) =
  let mapWithMarker: Map = getEntryById(modelInstance.map_id, Map)
  updateSearchEntryContent(connection, mapWithMarker)

proc connectMarkerSearchSignals() =
  connect(SignalType.stPostCreate, Marker, markerSignal)
  connect(SignalType.stPostUpdate, Marker, markerSignal)
  connect(SignalType.stPreDelete, Marker, markerSignal)



#ORGANIZATION
proc organizationCreateSignal*(connection: DbConn, modelInstance: Organization) = 
  addSearchEntry(connection, modelInstance)

proc organizationUpdateSignal*(connection: DbConn, modelInstance: Organization) = 
  updateSearchEntryContent(connection, modelInstance)

proc organizationDeleteSignal*(connection: DbConn, modelInstance: Organization) = 
  deleteSearchEntry(connection, modelInstance)

proc connectOrganizationSearchSignals() =
  connect(SignalType.stPreDelete, Organization, organizationDeleteSignal)
  connect(SignalType.stPostUpdate, Organization, organizationUpdateSignal)
  connect(SignalType.stPostCreate, Organization, organizationCreateSignal)


#CHARACTER ORGANIZATION MEMBERSHIP
proc organizationMembershipSignal*(connection: DbConn, modelInstance: OrganizationMembership) =
  let character = getEntryById(modelInstance.member_id, Character)
  characterUpdateSignal(connection, character)

  let organization = getEntryById(modelInstance.organization_id, Organization)
  organizationUpdateSignal(connection, organization)

proc connectOrganizationMembershipSignals() =
  connect(SignalType.stPostCreate, OrganizationMembership, organizationMembershipSignal)
  connect(SignalType.stPostUpdate, OrganizationMembership, organizationMembershipSignal)
  connect(SignalType.stPreDelete, OrganizationMembership, organizationMembershipSignal)
 

#QUEST
proc questCreateSignal*(connection: DbConn, modelInstance: Quest) = 
  addSearchEntry(connection, modelInstance)

proc questUpdateSignal*(connection: DbConn, modelInstance: Quest) = 
  updateSearchEntryContent(connection, modelInstance)

proc questDeleteSignal*(connection: DbConn, modelInstance: Quest) = 
  deleteSearchEntry(connection, modelInstance)

proc connectQuestSearchSignals() =
  connect(SignalType.stPreDelete, Quest, questDeleteSignal)
  connect(SignalType.stPostUpdate, Quest, questUpdateSignal)
  connect(SignalType.stPostCreate, Quest, questCreateSignal)



#SESSIONAUDIO
proc sessionAudioCreateSignal*(connection: DbConn, modelInstance: SessionAudio) = 
  addSearchEntry(connection, modelInstance)

proc sessionAudioUpdateSignal*(connection: DbConn, modelInstance: SessionAudio) = 
  updateSearchEntryContent(connection, modelInstance)

proc sessionAudioDeleteSignal*(connection: DbConn, modelInstance: SessionAudio) =
  deleteSearchEntry(connection, modelInstance)

proc connectSessionAudioSearchSignals() =
  connect(SignalType.stPreDelete, SessionAudio, sessionAudioDeleteSignal)
  connect(SignalType.stPostUpdate, SessionAudio, sessionAudioUpdateSignal)
  connect(SignalType.stPostCreate, SessionAudio, sessionAudioCreateSignal)



#TIMESTAMP
proc timestampSignal*(connection: DbConn, modelInstance: Timestamp) =
  let sessionAudioEntryWithTimestamp = getEntryById(modelInstance.session_audio_id, SessionAudio)
  updateSearchEntryContent(connection, sessionAudioEntryWithTimestamp)

proc connectTimestampSearchSignals() =
  connect(SignalType.stPostCreate, Timestamp, timestampSignal)
  connect(SignalType.stPreDelete, Timestamp, timestampSignal)



#SPELL
proc spellCreateSignal*(connection: DbConn, modelInstance: Spell) = 
  addSearchEntry(connection, modelInstance)

proc spellUpdateSignal*(connection: DbConn, modelInstance: Spell) = 
  updateSearchEntryContent(connection, modelInstance)

proc spellDeleteSignal*(connection: DbConn, modelInstance: Spell) = 
  deleteSearchEntry(connection, modelInstance)

proc connectSpellSearchSignals() =
  connect(SignalType.stPreDelete, Spell, spellDeleteSignal)
  connect(SignalType.stPostUpdate, Spell, spellUpdateSignal)
  connect(SignalType.stPostCreate, Spell, spellCreateSignal)



#RULE
proc ruleCreateSignal*(connection: DbConn, modelInstance: Rule) = 
  addSearchEntry(connection, modelInstance)

proc ruleUpdateSignal*(connection: DbConn, modelInstance: Rule) = 
  updateSearchEntryContent(connection, modelInstance)

proc ruleDeleteSignal*(connection: DbConn, modelInstance: Rule) = 
  deleteSearchEntry(connection, modelInstance)

proc connectRuleSearchSignals() =
  connect(SignalType.stPreDelete, Rule, ruleDeleteSignal)
  connect(SignalType.stPostUpdate, Rule, ruleUpdateSignal)
  connect(SignalType.stPostCreate, Rule, ruleCreateSignal)


proc connectSearchSignals*() =
  connectCharacterSearchSignals()
  connectOrganizationMembershipSignals()
  connectCreatureSearchSignals()
  connectDiaryEntrySearchSignals()
  connectEncounterSearchSignals()
  connectItemSearchSignals()
  connectLocationSearchSignals()
  connectMapSearchSignals()
  connectMarkerSearchSignals()
  connectQuestSearchSignals()
  connectRuleSearchSignals()
  connectSpellSearchSignals()
  connectSessionAudioSearchSignals()
  connectTimestampSearchSignals()
  connectOrganizationSearchSignals()