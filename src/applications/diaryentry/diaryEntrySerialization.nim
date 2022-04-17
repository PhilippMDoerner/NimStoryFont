import diaryEntryModel
import diaryEntryRepository
import ../genericArticleRepository
import ../campaign/campaignModel
import ../item/itemModel
import ../session/sessionModel
import ../encounter/[encounterModel]
import ../image/imageModel
import ../playerclass/playerClassModel
import ../location/[locationModel, locationRepository]
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[sugar, sequtils, options, strutils, strformat, logging]
import ../../utils/databaseUtils
import norm/[model, sqlite]


type DiaryEntryAuthorSerializable* = object
    pk: int64
    name: string

type AdjacentDiaryEntries* = object
    prior_diaryentry: Option[DiaryEntry]
    next_diaryentry: Option[DiaryEntry]

type DiaryEntrySerializable* = object
    pk*: int64
    title*: Option[string]
    campaign_details*: MinimumCampaignOverview
    creation_datetime*: DjangoDateTime
    update_datetime*: DjangoDateTime
    session_details*: SessionRead
    author_details*: DiaryEntryAuthorSerializable
    encounters*: seq[Encounter]
    adjacent_diaryentries*: AdjacentDiaryEntries

proc getAdjacentDiaryEntries(connection: DbConn, entry: DiaryEntryRead): AdjacentDiaryEntries =
    let diaryentries: seq[DiaryEntryRead] = connection.getDiaryEntriesForCampaign(entry.session_id.campaign_id.name)
    if diaryentries.len() == 0:
        return AdjacentDiaryEntries(prior_diaryentry: none(DiaryEntry), next_diaryentry: none(DiaryEntry))
    
    var entryIndex = -1
    for i in 0..diaryentries.len()-1:
        if diaryentries[i].id == entry.id:
            entryIndex = i
            break
    
    var nextDiaryEntryId = none(int64)
    var priorDiaryEntryId = none(int64)
    if entryIndex == diaryentries.len()-1:
        priorDiaryEntryId = some(diaryentries[entryIndex - 1].id)

    elif entryIndex == 0:
        nextDiaryEntryId = some(diaryentries[entryIndex + 1].id)

    elif entryIndex == -1:
        raise newException(ValueError, fmt"The entry with id {entry.id} was not in a list of diaryentries for campaign {entry.session_id.campaign_id.name}.")
    
    else:
        priorDiaryEntryId = some(diaryentries[entryIndex - 1].id)
        nextDiaryEntryId = some(diaryentries[entryIndex + 1].id)


    let priorDiaryEntry = if priorDiaryEntryId.isSome(): some(connection.getEntryById(priorDiaryEntryId.get(), DiaryEntry)) else: none(DiaryEntry)
    let nextDiaryEntry = if nextDiaryEntryId.isSome(): some(connection.getEntryById(nextDiaryEntryId.get(), DiaryEntry)) else: none(DiaryEntry)

    result = AdjacentDiaryEntries(
        prior_diaryentry: priorDiaryEntry, 
        next_diaryentry: nextDiaryEntry
    )
    
proc serializeDiaryEntryRead*(connection: DbConn, entry: DiaryEntryRead): DiaryEntrySerializable =
    let session = connection.getEntryById(entry.session_id.id, SessionRead)
    let encounters = connection.getManyFromOne(entry, Encounter)

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
        encounters: encounters,
        adjacent_diaryentries: connection.getAdjacentDiaryEntries(entry)
    )

proc serializeDiaryEntry*(connection: DbConn, entry: DiaryEntry): DiaryEntrySerializable =
    let entryRead = connection.getEntryById(entry.id, DiaryEntryRead)
    result = connection.serializeDiaryEntryRead(entryRead)





type DiaryEntryOverviewSerializable* = object
    pk*: int64
    name_full*: string
    name*: string
    campaign*: int64
    campaign_details*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime
    session_details*: DiaryEntrySession
    author_details*: DiaryEntryAuthorSerializable

proc overviewSerialize*(connection: DbConn, entry: DiaryEntryRead): DiaryEntryOverviewSerializable =
    let title = if entry.title.isSome(): entry.title.get() else: ""
    result = DiaryEntryOverviewSerializable(
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
