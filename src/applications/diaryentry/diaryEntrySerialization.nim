import diaryEntryModel
import diaryEntryRepository
import diaryEntryService
import ../character/characterEncounterModel
import ../genericArticleRepository
import ../campaign/campaignModel
import ../session/sessionModel
import ../location/locationModel
import ../encounter/[encounterModel, encounterSerialization]
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[sugar, options, strutils, strformat, sequtils, tables]
import norm/[model, sqlite]
import ../articleModel


type DiaryEntryAuthorSerializable* = object
    pk: int64
    name: string

type DiaryEntryStub* = object
    session_details: DiaryEntrySession
    author_details: DiaryEntryAuthorSerializable

type AdjacentDiaryEntries* = object
    prior_diaryentry: Option[DiaryEntryStub]
    next_diaryentry: Option[DiaryEntryStub]

type DiaryEntrySerializable* = object
    pk*: int64
    title*: Option[string]
    campaign_details*: MinimumCampaignOverview
    creation_datetime*: DjangoDateTime
    update_datetime*: DjangoDateTime
    session_details*: SessionRead
    author_details*: DiaryEntryAuthorSerializable
    encounters*: seq[EncounterSerializable]
    adjacent_diaryentries*: AdjacentDiaryEntries

proc serializeToDiaryEntryStub(entry: DiaryEntryRead): DiaryEntryStub =
    result = DiaryEntryStub(
            session_details: entry.session_id,
            author_details: DiaryEntryAuthorSerializable(
                pk: entry.author_id.id, 
                name: entry.author_id.username
            )
    )

proc getAdjacentDiaryEntries(connection: DbConn, entry: DiaryEntryRead): AdjacentDiaryEntries =
    let diaryentries: seq[DiaryEntryRead] = connection.getDiaryEntriesForCampaign(entry.session_id.campaign_id.name)
    if diaryentries.len() == 0:
        return AdjacentDiaryEntries(prior_diaryentry: none(DiaryEntryStub), next_diaryentry: none(DiaryEntryStub))
    
    var entryIndex = -1
    for i in 0..diaryentries.len()-1:
        if diaryentries[i].id == entry.id:
            entryIndex = i
            break
    
    var nextDiaryEntry = none(DiaryEntryRead)
    var priorDiaryEntry = none(DiaryEntryRead)
    if entryIndex == diaryentries.len()-1:
        priorDiaryEntry = some(diaryentries[entryIndex - 1])

    elif entryIndex == 0:
        nextDiaryEntry = some(diaryentries[entryIndex + 1])

    elif entryIndex == -1:
        raise newException(ValueError, fmt"The entry with id {entry.id} was not in a list of diaryentries for campaign {entry.session_id.campaign_id.name}.")
    
    else:
        priorDiaryEntry = some(diaryentries[entryIndex - 1])
        nextDiaryEntry = some(diaryentries[entryIndex + 1])

    result = AdjacentDiaryEntries(
        prior_diaryentry: priorDiaryEntry.map(serializeToDiaryEntryStub), 
        next_diaryentry: nextDiaryEntry.map(serializeToDiaryEntryStub)
    )
    
proc serializeDiaryEntryRead*(connection: DbConn, entry: DiaryEntryRead): DiaryEntrySerializable =
    let session = connection.getEntryById(entry.session_id.id, SessionRead)

    let encounters = connection.getManyFromOne(entry, EncounterRead)
    let encounterParentLocations: Table[int64, seq[Location]] = connection.getDiaryEntryEncounterLocations(encounters)
    let encounterCharacterConnections: Table[int64, seq[CharacterEncounterRead]] = connection.getManyFromOne(encounters, CharacterEncounterRead, "encounter_id")
    var serializedEncounters: seq[EncounterSerializable] = @[]
    for encounter in encounters:
        let parentLocations: seq[Location] = if encounterParentLocations.hasKey(encounter.id): 
                encounterParentLocations[encounter.id]
            else: 
                @[]
        let connections: seq[CharacterEncounterRead] = if encounterCharacterConnections.hasKey(encounter.id): 
                encounterCharacterConnections[encounter.id]
            else: 
                @[]

        serializedEncounters.add(serializeEncounterRead(encounter, connections, parentLocations))



    result = DiaryEntrySerializable(
        pk: entry.id,
        title: entry.title,
        campaign_details: entry.session_id.campaign_id,
        creation_datetime: entry.creation_datetime,
        update_datetime: entry.update_datetime,
        session_details: session,
        author_details: DiaryEntryAuthorSerializable(
            pk: entry.author_id.id, 
            name: entry.author_id.username
        ),
        encounters: encounters.map(enc => connection.serializeEncounterRead(enc)),
        adjacent_diaryentries: connection.getAdjacentDiaryEntries(entry)
    )

proc serializeDiaryEntry*(connection: DbConn, entry: DiaryEntry): DiaryEntrySerializable =
    let entryRead = connection.getEntryById(entry.id, DiaryEntryRead)
    result = connection.serializeDiaryEntryRead(entryRead)





type DiaryEntryOverviewSerializable* = object
    article_type*: ArticleType
    pk*: int64
    name_full*: string
    name*: string
    campaign*: int64
    campaign_details*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime
    session_details*: DiaryEntrySession
    author_details*: DiaryEntryAuthorSerializable

proc overviewSerialize*(connection: DbConn, entry: DiaryEntryRead): DiaryEntryOverviewSerializable =
    let title = entry.title.get("")
    result = DiaryEntryOverviewSerializable(
        article_type: ArticleType.atDiaryEntry,
        pk: entry.id,
        name_full: fmt"Diary Entry #{entry.session_id.session_number:>3} - {title}",
        name: title,
        campaign: entry.session_id.campaign_id.id,
        campaign_details: entry.session_id.campaign_id,
        update_datetime: entry.update_datetime,
        session_details: entry.session_id,
        author_details: DiaryEntryAuthorSerializable(
            pk: entry.author_id.id, 
            name: entry.author_id.username
        )
    )
