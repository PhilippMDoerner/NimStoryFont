import diaryEntryModel
import ../genericArticleRepository
import norm/[sqlite]
import ../character/[characterEncounterModel, characterEncounterRepository]
import diaryEntryRepository
import ../allUrlParams
import ../encounter/encounterModel
import ../location/[locationModel, locationRepository]
import std/[sequtils, sugar, options, tables]

export diaryEntryModel

proc getDiaryEntry*(connection: DbConn, requestParams: ReadDiaryEntryParams): DiaryEntryRead =
  result = diaryEntryRepository.getDairyEntry(
    connection,
    requestParams.campaignName, 
    requestParams.sessionNumber, 
    requestParams.isMainSession, 
    requestParams.userName
  )

proc getDiaryEntryEncounterLocations*(connection: DbConn, encounters: seq[Encounter]): Table[int64, seq[Location]] =
  let locationIds: seq[int64] = encounters
    .filter(enc => enc.location_id.isSome())
    .map(enc => enc.location_id.get())
  
  result = connection.getParentLocations(locationIds)

proc getDiaryEntryEncounterLocations*(connection: DbConn, encounters: seq[EncounterRead]): Table[int64, seq[Location]] =
  let locationIds: seq[int64] = encounters
    .filter(enc => enc.location_id.isSome())
    .map(enc => enc.location_id.get().id)
  
  result = connection.getParentLocations(locationIds)
    
proc getDiaryEntryEncounterConnections*(connection: DbConn, encounters: seq[Encounter] | seq[EncounterRead]): Table[int64, seq[CharacterEncounterRead]] =
  let encounterIds: seq[int64] = encounters.map(enc => enc.id)
  result = connection.getEncounterConnectionsForEncounters(encounterIds)

proc getCampaignDiaryEntries*(connection: DbConn, requestParams: ReadListParams): seq[DiaryentryRead] =
  result = connection.getDiaryEntriesForCampaign(requestParams.campaignName)