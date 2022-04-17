import diaryEntryModel
import ../genericArticleRepository
import ../campaign/campaignModel
import ../item/itemModel
import ../encounter/[encounterModel]
import ../image/imageModel
import ../playerclass/playerClassModel
import ../location/[locationModel, locationRepository]
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[sugar, sequtils, options, strutils, strformat, logging]
import ../../utils/databaseUtils
import norm/[model, sqlite]

type DiaryEntrySerializable* = DiaryEntryRead

proc serializeDiaryEntry*(connection: DbConn, entry: DiaryEntry): DiaryEntrySerializable =
    result = connection.getEntryById(entry.id, DiaryEntryRead)

proc serializeDiaryEntryRead*(connection: DbConn, entry: DiaryEntryRead): DiaryEntrySerializable =
    result = entry



type DiaryEntryAuthorSerializable* = object
    pk: int64
    name: string

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
