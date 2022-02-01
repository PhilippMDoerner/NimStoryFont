import ../authentication/authenticationRepository
import ../campaign/campaignRepository
import ../character/characterRepository
import ../creature/creatureRepository
import ../diaryentry/diaryEntryRepository
import ../encounter/[encounterUtils, encounterRepository]
import ../item/itemRepository
import ../location/locationRepository
import ../map/mapRepository
import ../organization/organizationRepository
import ../quest/questRepository
import ../session/sessionRepository
import ../sessionaudio/sessionaudioRepository
import ../spell/spellRepository
import ../rules/ruleRepository
import ../base_generics/genericArticleRepository
import std/[strformat, options]


proc getSearchBody*(modelInstance: Character): string =
  result.add(fmt "{modelInstance.name} ")
  result.add(fmt "{modelInstance.title.get(otherwise = '')} ")
  result.add(fmt "{modelInstance.race} {modelInstance.gender}")
  
  if modelInstance.organization_id.isSome():
    let organization: Organization = getEntryById[Organization](modelInstance.organization_id.get())
    result.add(fmt "{organization.name} ")
  
  result.add(fmt "{modelInstance.description.get(otherwise = '')}")
    
proc getSearchTitle*(modelInstance: Character): string =
  return modelInstance.name


proc getSearchBody*(modelInstance: Creature): string =
  result.add(fmt "{modelInstance.name} ")
  result.add(fmt "{modelInstance.description.get(otherwise = '')}")

proc getSearchTitle*(modelInstance: Creature): string =
  return modelInstance.name



proc getSearchTitle*(modelInstance: DiaryEntry): string =
  let session: Session = getSessionById(modelInstance.session_id)
  
  let sessionType: string = if session.is_main_session: "Main " else: "Side "
  result.add(fmt "{sessionType} Diaryentry {session.session_number} ")
  result.add(fmt " {modelInstance.title.get(otherwise = ''")

proc getSearchBody*(modelInstance: DiaryEntry): string =
  result.add(fmt "{getSearchTitle(modelInstance)} {modelInstance.title}")

  let author: User = getUserById(modelInstance.author_id)
  result.add(fmt "{author.username} ")

  let encounters: seq[Encounter] = getManyFromOne(modelInstance, Encounter)
  for encounter in encounters:
    result.add(fmt "{encounter.title.get(otherwise = '')} {encounter.description.get(otherwise = '')}")



proc getSearchBody*(modelInstance: Encounter): string =
  let diaryentry: EncounterDiaryentry = getEntryById[EncounterDiaryentry](modelInstance.diaryentry_id)
  let sessionNumber: int64 = diaryentry.session_id.session_number

  result.add(fmt "Session {sessionNumber} ")
  result.add(fmt "{modelInstance.title.get(otherwise = '')} ")
  result.add(fmt "{modelInstance.description.get(otherwise = '')")

  if modelInstance.location_id.isSome():
    let location: EncounterLocation = getEntryById[EncounterLocation](modelInstance.location_id.get())
    result.add(fmt "{location.name} ")

proc getSearchTitle*(modelInstance: Encounter): string =
  return $modelInstance



proc getSearchBody*(modelInstance: Item): string =
  result.add(fmt "{modelInstance.name} ")
  result.add(fmt "{modelInstance.description.get(otherwise = '')} ")

  if modelInstance.owner_id.isSome():
    let owner: ItemOwner = getEntryById[ItemOwner](modelInstance.owner_id.get())
    result.add(fmt "{owner.name} ")

proc getSearchTitle*(modelInstance: Item): string =
  return modelInstance.name



proc getSearchBody*(modelInstance: Location): string =
  result.add(fmt "{modelInstance.name} ")
  result.add(fmt "{modelInstance.description.get(otherwise = '')} ")

  let parentLocations: seq[Location] = getParentLocations(modelInstance)
  for location in parentLocations:
    result.add(fmt "{location.name} ")

proc getSearchTitle*(modelInstance: Location): string =
  return modelInstance.name



proc getSearchBody*(modelInstance: Map): string =
  return ""#TODO: Make this

proc getSearchTitle*(modelInstance: Map): string =
  return modelInstance.name



proc getSearchBody*(modelInstance: Organization): string =
  result.add(fmt """{modelInstance.name} """)  
  result.add(fmt """{modelInstance.description.get(otherwise = "")}  """)
  result.add(fmt """{modelInstance.leader.get(otherwise = "")}  """)

  if modelInstance.headquarter_id.isSome():
    let headquarterLocation = getEntryById[OrganizationLocation](modelInstance.headquarter_id.get())
    result.add(fmt "{headquarterLocation.name} ")
  
  let members: seq[OrganizationCharacter] = getManyFromOne(modelInstance, OrganizationCharacter)
  for member in members:
    result.add(fmt "{member.name} ")
  

proc getSearchTitle*(modelInstance: Organization): string =
  return modelInstance.name



proc getSearchBody*(modelInstance: Quest): string =
  result.add(fmt "{modelInstance.name} ")
  result.add(fmt "{modelInstance.description.get(otherwise = '')}  ")
  result.add(fmt "{modelInstance.abstract.get(otherwise = '')}  ")
  result.add(fmt "{modelInstance.status} ")

  if modelInstance.giver_id.isSome():
    let questGiver: QuestCharacter = getEntryById[QuestCharacter](modelInstance.giver_id.get())
    result.add(fmt "{questGiver.name} ")
  
  if modelInstance.taker_id.isSome():
    let questTaker: QuestCharacter = getEntryById[QuestCharacter](modelInstance.taker_id.get())
    result.add(fmt "{questTaker.name}")
  
proc getSearchTitle*(modelInstance: Quest): string =
  return modelInstance.name


proc getSearchTitle*(modelInstance: SessionAudio): string =
  let session: Session = getEntryById[Session](modelInstance.session_id)
  result.add(fmt "Recording of session #{session.session_number}")

proc getSearchBody*(modelInstance: SessionAudio): string =
  result.add(fmt "{getSearchTitle(modelInstance)} ")

  let timestamps: seq[Timestamp] = getSessionAudioTimestamps(modelInstance.id)
  for timestamp in timestamps:
    result.add(fmt "{timestamp.name} ")



proc getSearchBody*(modelInstance: Spell): string =
  result.add(fmt "{modelInstance.name} {modelInstance.description.get(otherwise = '')}")

proc getSearchTitle*(modelInstance: Spell): string =
  return modelInstance.name



proc getSearchBody*(modelInstance: Rule): string =
  result.add(fmt "{modelInstance.name} {modelInstance.description.get(otherwise = '')}")

proc getSearchTitle*(modelInstance: Rule): string =
  return modelInstance.name

