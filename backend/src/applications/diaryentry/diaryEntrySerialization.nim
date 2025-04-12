import diaryEntryModel
import diaryEntryRepository
import diaryEntryService
import diaryEntryUtils
import ../character/characterEncounterModel
import ../genericArticleRepository
import ../campaign/campaignModel
import ../session/[sessionSerialization, sessionModel]
import ../location/locationModel
import ../encounter/[encounterModel, encounterSerialization]
import ../../utils/[myStrutils, djangoDateTime/djangoDateTimeType]
import std/[sugar, options, strutils, strformat, sequtils, tables]
import norm/[model, sqlite]
import ../articleModel


type DiaryEntryAuthorSerializable* = object
    pk: int64
    name: string

type DiaryEntryStub* = object
    session_details: SessionSerializable
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
    session_details*: SessionSerializable
    author_details*: DiaryEntryAuthorSerializable
    encounters*: seq[EncounterSerializable]
    adjacent_diaryentries*: AdjacentDiaryEntries

proc serializeToDiaryEntryStub(connection: DbConn, entry: DiaryEntryRead): DiaryEntryStub =
    let session = connection.getEntryById(entry.session_id.id, SessionRead)
    let serializedSession = connection.serializeSessionRead(session)

    result = DiaryEntryStub(
            session_details: serializedSession,
            author_details: DiaryEntryAuthorSerializable(
                pk: entry.author_id.id, 
                name: entry.author_id.username
            )
    )

proc getAdjacentDiaryEntries(connection: DbConn, entry: DiaryEntryRead): AdjacentDiaryEntries =
    # Keep in mind diaryentries are ordered most current diaryentry first, later ones last.
    # So the next diaryentry is at i-1, the prior one at i+1
    var diaryentries: seq[DiaryEntryRead] = connection.getDiaryEntriesForCampaign(entry.session_id.campaign_id.name)
    if diaryentries.len() == 0:
        return AdjacentDiaryEntries(prior_diaryentry: none(DiaryEntryStub), next_diaryentry: none(DiaryEntryStub))
    
    var entryIndex = -1
    for i in 0..diaryentries.len()-1:
        if diaryentries[i].id == entry.id:
            entryIndex = i
            break
    
    let priorDiaryEntry = block:
        let priorIndex = entryIndex + 1
        let hasPriorDiaryEntry = priorIndex <= diaryentries.high
        if hasPriorDiaryEntry:
            some(diaryentries[priorIndex])
        else:
            none(DiaryEntryRead)
    
    let nextDiaryEntry = block:    
        let nextIndex = entryIndex - 1
        let hasNextDiaryEntry = nextIndex > diaryentries.low
        if hasNextDiaryEntry:
            some(diaryentries[nextIndex])
        else:
            none(DiaryEntryRead)
    
    result = AdjacentDiaryEntries(
        prior_diaryentry: priorDiaryEntry.map(entry => connection.serializeToDiaryEntryStub(entry)), 
        next_diaryentry: nextDiaryEntry.map(entry => connection.serializeToDiaryEntryStub(entry))
    )
    
proc serializeDiaryEntryRead*(connection: DbConn, entry: DiaryEntryRead): DiaryEntrySerializable =
    let session = connection.getEntryById(entry.session_id.id, SessionRead)
    let serializedSession = connection.serializeSessionRead(session)

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
        session_details: serializedSession,
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

    
type DiaryEntrySessionSerializable* = object
    start_day: Option[int]
    end_day: Option[int]
    session_number: int
    pk: int64
    is_main_session: bool
    is_main_session_int: 0..1

proc serializeDiaryEntrySession*(entry: DiaryEntrySession): DiaryEntrySessionSerializable =
    result = DiaryEntrySessionSerializable(
        start_day: entry.start_day,
        end_day: entry.end_day,
        session_number: entry.session_number,
        pk: entry.id,
        is_main_session: entry.is_main_session,
        is_main_session_int: entry.is_main_session.int
    )

type DiaryEntryOverviewSerializable* = object
    article_type*: ArticleType
    description*: Option[string]
    pk*: int64
    name_full*: string
    name*: string
    campaign*: int64
    campaign_details*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime
    session_details*: DiaryEntrySessionSerializable
    author_details*: DiaryEntryAuthorSerializable

proc overviewSerialize*(entry: DiaryEntryRead, encounters: seq[EncounterRead]): DiaryEntryOverviewSerializable =
    let firstEncounter: Option[EncounterRead] = if encounters.len() > 0: some(encounters[0]) else: none(EncounterRead)
    let firstEncounterText: Option[string] = firstEncounter.map(enc => enc.description).flatten()
    
    result = DiaryEntryOverviewSerializable(
        article_type: ArticleType.atDiaryEntry,
        description: firstEncounterText.map(truncate),
        pk: entry.id,
        name_full: $entry,
        name: entry.title.get(""),
        campaign: entry.session_id.campaign_id.id,
        campaign_details: entry.session_id.campaign_id,
        update_datetime: entry.update_datetime,
        creation_datetime: entry.creation_datetime,
        session_details: entry.session_id.serializeDiaryEntrySession(),
        author_details: DiaryEntryAuthorSerializable(
            pk: entry.author_id.id, 
            name: entry.author_id.username
        )
    )

proc overviewSerialize*(connection: DbConn, entry: DiaryEntryRead): DiaryEntryOverviewSerializable =
    let encounters = connection.getManyFromOne(entry, EncounterRead)
    result = overviewSerialize(entry, encounters)

proc overviewSerialize*(connection: DbConn, entries: seq[DiaryEntryRead]): seq[DiaryEntryOverviewSerializable] =
    let allEncounters: Table[int64, seq[EncounterRead]] = connection.getManyFromOne(entries, EncounterRead, "diaryentry_id")
    for entry in entries:
        let encounters = allEncounters[entry.id]
        result.add(overviewSerialize(entry, encounters))