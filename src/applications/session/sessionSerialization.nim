import sessionModel
import norm/sqlite
import ../campaign/campaignModel
import ../diaryentry/[diaryEntryModel]
import ../genericArticleRepository
import sessionUtils
import ../../utils/djangoDateTime/[djangoDateTimeType]
import std/[options, sequtils, strformat]

type SessionDiaryEntrySerializable* = object
    author_name: string
    name: string

proc serializeSessionDiaryentry(entry: DiaryEntryRead): SessionDiaryEntrySerializable =    
    var diaryEntryName: string = ""
    diaryEntryName.add(fmt"Diary Entry #{entry.session_id.session_number}")
    if entry.title.isSome():
        diaryEntryName.add(fmt" - {entry.title}")

    result = SessionDiaryEntrySerializable(
        author_name: entry.author_id.username,
        name: diaryEntryName
    )

type SessionSerializable* = object
    session_number: int
    session_date: DjangoDateTime
    is_main_session: bool
    is_main_session_int: 0..1
    end_day: Option[int]
    start_day: Option[int]
    creation_datetime: DjangoDateTime
    update_datetime: DjangoDateTime
    campaign: int64
    campaign_details: MinimumCampaignOverview
    id: int64
    name: string
    diaryentries: seq[SessionDiaryEntrySerializable]
    has_recording: bool

proc serializeSessionRead*(connection: DbConn, entry: SessionRead): SessionSerializable =
    let diaryentries = connection.getManyFromOne(entry, DiaryEntryRead)
        .map(serializeSessionDiaryentry)
    
    result = SessionSerializable(
        id: entry.id,
        session_number: entry.session_number,
        session_date: entry.session_date,
        is_main_session: entry.is_main_session,
        is_main_session_int: entry.is_main_session.int,
        start_day: entry.start_day,
        end_day: entry.end_day,
        name: $entry,
        update_datetime: entry.update_datetime,
        creation_datetime: entry.creation_datetime,
        campaign: entry.campaign_id.id,
        campaign_details: entry.campaign_id,
        diaryentries: diaryentries
    )

proc serializeSession*(connection: DbConn, entry: Session): SessionSerializable =
    let fullEntry = connection.getEntryById(entry.id, SessionRead)
    result = connection.serializeSessionRead(fullEntry)

