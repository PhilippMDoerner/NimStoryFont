import ../authentication/authenticationService
import ../character/[characterModel, characterService]
import ../creature/creatureService
import ../diaryentry/diaryEntryService
import ../encounter/[encounterUtils, encounterService]
import ../item/itemService
import ../location/locationService
import ../map/mapService
import ../organization/organizationService
import ../quest/questService
import ../session/sessionService
import ../sessionaudio/sessionaudioService
import ../spell/spellService
import ../sessionAudioTimestamp/timestampModel
import ../rules/ruleService
import ../user/userService
import ../genericArticleRepository
import ../mapMarker/markerModel
import std/[strformat, options]
import ../../utils/databaseUtils


proc getSearchBody*(connection: DbConn, modelInstance: Character): string =
  result.add(fmt """{modelInstance.name} """)
  result.add(fmt """{modelInstance.title.get(otherwise = "")} """)
  result.add(fmt """{modelInstance.race} {modelInstance.gender} """)
  
  let memberships: seq[OrganizationMembershipRead] = connection.getOrganizationMemberships(modelInstance.id, OrganizationMembershipRead)
  for membership in memberships:
    result.add(fmt """{membership.organization_id.name} {membership.role.get("")} """)
  
  result.add(fmt """{modelInstance.description.get(otherwise = "")}""")
    
proc getSearchTitle*(connection: DbConn, modelInstance: Character): string =
  return modelInstance.name


proc getSearchBody*(connection: DbConn, modelInstance: Creature): string =
  result.add(fmt """{modelInstance.name} """)
  result.add(fmt """{modelInstance.description.get(otherwise = "")}""")

proc getSearchTitle*(connection: DbConn, modelInstance: Creature): string =
  return modelInstance.name



proc getSearchTitle*(connection: DbConn, modelInstance: DiaryEntry): string =
  let session: Session = connection.getEntryById(modelInstance.session_id, Session)
  
  let sessionType: string = if session.is_main_session: "Main " else: "Side "
  result.add(fmt """{sessionType} Diaryentry {session.session_number} """)
  result.add(fmt """ {modelInstance.title.get(otherwise = "")}""")

proc getSearchBody*(connection: DbConn, modelInstance: DiaryEntry): string =
  result.add(fmt """{getSearchTitle(connection, modelInstance)} {modelInstance.title}""")

  let author: User = getEntryById(modelInstance.author_id, User)
  result.add(fmt """{author.username} """)

  let encounters: seq[Encounter] = getManyFromOne(modelInstance, Encounter)
  for encounter in encounters:
    result.add(fmt """{encounter.title.get(otherwise = "")} {encounter.description.get(otherwise = "")}""")



proc getSearchBody*(connection: DbConn, modelInstance: Encounter): string =
  let diaryentry: EncounterDiaryentry = connection.getEntryById(modelInstance.diaryentry_id, EncounterDiaryentry)
  let sessionNumber: int64 = diaryentry.session_id.session_number

  result.add(fmt """Session {sessionNumber} """)
  result.add(fmt """{modelInstance.title.get(otherwise = "")} """)
  result.add(fmt """{modelInstance.description.get(otherwise = "")}""")

  if modelInstance.location_id.isSome():
    let location: EncounterLocation = connection.getEntryById(modelInstance.location_id.get(), EncounterLocation)
    result.add(fmt """{location.name} """)

proc getSearchTitle*(connection: DbConn, modelInstance: Encounter): string =
  return $modelInstance



proc getSearchBody*(connection: DbConn, modelInstance: Item): string =
  result.add(fmt """{modelInstance.name} """)
  result.add(fmt """{modelInstance.description.get(otherwise = "")} """)

  if modelInstance.owner_id.isSome():
    let owner: ItemOwner = connection.getEntryById(modelInstance.owner_id.get(), ItemOwner)
    result.add(fmt """{owner.name} """)

proc getSearchTitle*(connection: DbConn, modelInstance: Item): string =
  return modelInstance.name



proc getSearchBody*(connection: DbConn, modelInstance: Location): string =
  result.add(fmt """{modelInstance.name} """)
  result.add(fmt """{modelInstance.description.get(otherwise = "")} """)

  let parentLocations: seq[Location] = connection.getParentLocations(modelInstance)
  for location in parentLocations:
    result.add(fmt """{location.name} """)

proc getSearchTitle*(connection: DbConn, modelInstance: Location): string =
  return modelInstance.name



proc getSearchBody*(connection: DbConn, modelInstance: Map | MarkerMap): string =
  result.add(fmt """{modelInstance.name} """)

  let mapLocations: seq[LocationRead] = connection.getManyToMany(modelInstance, MarkerRead, LocationRead)
  for location in mapLocations:
    result.add(fmt """{location.name} """)

proc getSearchTitle*(connection: DbConn, modelInstance: Map | MarkerMap): string =
  return modelInstance.name



proc getSearchBody*(connection: DbConn, modelInstance: Organization | OrganizationRead): string =
  result.add(fmt """{modelInstance.name} """)  
  result.add(fmt """{modelInstance.description.get(otherwise = "")} """)
  result.add(fmt """{modelInstance.leader.get(otherwise = "")}  """)

  if modelInstance.headquarter_id.isSome():
    when modelInstance is Organization:
      let headquarterLocation = connection.getEntryById(modelInstance.headquarter_id.get(), OrganizationLocation)
    elif modelinstance is OrganizationRead:
      let headquarterLocation = modelInstance.headquarter_id.get()

    result.add(fmt """{headquarterLocation.name} """)
  
  let members: seq[OrganizationCharacter] = connection.getManyFromOne(modelInstance, OrganizationCharacter)
  for member in members:
    result.add(fmt """{member.name} """)
  

proc getSearchTitle*(connection: DbConn, modelInstance: Organization | OrganizationRead): string =
  return modelInstance.name



proc getSearchBody*(connection: DbConn, modelInstance: Quest): string =
  result.add(fmt """{modelInstance.name} """)
  result.add(fmt """{modelInstance.description.get(otherwise = "")}  """)
  result.add(fmt """{modelInstance.abstract.get(otherwise = "")}  """)
  result.add(fmt """{modelInstance.status} """)

  if modelInstance.giver_id.isSome():
    let questGiver: QuestCharacter = connection.getEntryById(modelInstance.giver_id.get(), QuestCharacter)
    result.add(fmt """{questGiver.name} """)
  
  if modelInstance.taker_id.isSome():
    let questTaker: QuestCharacter = connection.getEntryById(modelInstance.taker_id.get(), QuestCharacter)
    result.add(fmt """{questTaker.name}""")
  
proc getSearchTitle*(connection: DbConn, modelInstance: Quest): string =
  return modelInstance.name


proc getSearchTitle*(connection: DbConn, modelInstance: SessionAudio): string =
  let session: Session = connection.getEntryById(modelInstance.session_id, Session)
  result.add(fmt """Recording of session #{session.session_number}""")

proc getSearchBody*(connection: DbConn, modelInstance: SessionAudio): string =
  result.add(fmt """{getSearchTitle(connection, modelInstance)} """)

  let timestamps: seq[Timestamp] = connection.getManyFromOne(modelInstance, Timestamp)
  for timestamp in timestamps:
    result.add(fmt """{timestamp.name} """)



proc getSearchBody*(connection: DbConn, modelInstance: Spell): string =
  result.add(fmt """{modelInstance.name} {modelInstance.description}""")

proc getSearchTitle*(connection: DbConn, modelInstance: Spell): string =
  return modelInstance.name



proc getSearchBody*(connection: DbConn, modelInstance: Rule): string =
  result.add(fmt """{modelInstance.name} {modelInstance.description.get(otherwise = "")}""")

proc getSearchTitle*(connection: DbConn, modelInstance: Rule): string =
  return modelInstance.name

