import std/[options, sequtils, strformat, sugar, tables]
import norm/[model, sqlite]
import ./sessionModel
import ./sessionUtils
import ../campaign/campaignModel
import ../diaryentry/[diaryEntryModel]
import ../sessionaudio/sessionaudioModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[djangoDateTimeType]

type SessionDiaryEntrySerializable* = object
  author_name: string
  name: string

proc serializeSessionDiaryentry(entry: DiaryEntryRead): SessionDiaryEntrySerializable =
  var diaryEntryName: string = ""
  diaryEntryName.add(fmt"Diary Entry #{entry.session_id.session_number}")
  if entry.title.isSome():
    diaryEntryName.add(fmt" - {entry.title.get()}")

  result = SessionDiaryEntrySerializable(
    author_name: entry.author_id.username, name: diaryEntryName
  )

type SessionSerializable* = object
  session_number*: int
  session_date*: DjangoDateTime
  is_main_session*: bool
  is_main_session_int*: 0 .. 1
  end_day*: Option[int]
  start_day*: Option[int]
  creation_datetime*: DjangoDateTime
  update_datetime*: DjangoDateTime
  campaign*: int64
  campaign_details*: MinimumCampaignOverview
  pk*: int64
  name*: string
  name_full*: string
  diaryentries*: seq[SessionDiaryEntrySerializable]
  has_recording*: bool

proc serializeSessionRead(
    entry: SessionRead, diaryentries: seq[DiaryEntryRead]
): SessionSerializable =
  let serializedDiaryentries = diaryentries.map(serializeSessionDiaryentry)
  let sessionString = $entry

  result = SessionSerializable(
    pk: entry.id,
    session_number: entry.session_number,
    session_date: entry.session_date,
    is_main_session: entry.is_main_session,
    is_main_session_int: entry.is_main_session.int,
    start_day: entry.start_day,
    end_day: entry.end_day,
    name: sessionString,
    name_full: sessionString,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
    diaryentries: serializedDiaryentries,
  )

proc serializeSessionRead*(
    connection: DbConn, entry: SessionRead
): SessionSerializable =
  let diaryentries = connection.getManyFromOne(entry, DiaryEntryRead)
  result = serializeSessionRead(entry, diaryentries)

proc serializeSessionReads*(
    connection: DbConn, entries: seq[SessionRead]
): seq[SessionSerializable] =
  let allDiaryEntries: Table[int64, seq[DiaryEntryRead]] =
    connection.getManyFromOne(entries, DiaryEntryRead, "session_id")
  for entry in entries:
    let serializedEntry = serializeSessionRead(entry, allDiaryEntries[entry.id])
    result.add(serializedEntry)

proc serializeSession*(connection: DbConn, entry: Session): SessionSerializable =
  let fullEntry = connection.getEntryById(entry.id, SessionRead)
  result = connection.serializeSessionRead(fullEntry)

type SessionOverviewSerializable* = object
  article_type: string
  pk: int64
  name_full: string
  name: string
  campaign_details: MinimumCampaignOverview
  update_datetime: DjangoDateTime
  has_recording: bool
  author_ids: seq[int64]
  start_day: Option[int]
  end_day: Option[int]
  session_number: int
  is_main_session: bool
  is_main_session_int: 0 .. 1
  session_date: DjangoDateTime

proc overviewSerialize*(
    entry: SessionRead, sessionAudios: seq[SessionAudio], diaryentries: seq[DiaryEntry]
): SessionOverviewSerializable =
  let entryString = $entry
  let hasRecording = sessionAudios.len > 0
  let authorIds = diaryentries.map(diaryentry => diaryentry.author_id)
  result = SessionOverviewSerializable(
    article_type: "session",
    pk: entry.id,
    name_full: entryString,
    name: entryString,
    campaign_details: entry.campaign_id,
    update_datetime: entry.update_datetime,
    has_recording: hasRecording,
    author_ids: authorIds,
    start_day: entry.start_day,
    end_day: entry.end_day,
    session_number: entry.session_number,
    is_main_session: entry.is_main_session,
    is_main_session_int: entry.is_main_session.int,
    session_date: entry.session_date,
  )

proc overviewSerialize*(
    connection: DbConn, entry: SessionRead
): SessionOverviewSerializable =
  let sessionAudios = connection.getManyFromOne(entry, SessionAudio)
  let diaryentries = connection.getManyFromOne(entry, DiaryEntry)

  result = overviewSerialize(entry, sessionAudios, diaryentries)

proc overviewSerialize*(
    connection: DbConn, entries: seq[SessionRead]
): seq[SessionOverviewSerializable] =
  let allDiaryEntries: Table[int64, seq[DiaryEntry]] =
    connection.getManyFromOne(entries, DiaryEntry, "session_id")
  let allSessionAudios: Table[int64, seq[SessionAudio]] =
    connection.getManyFromOne(entries, SessionAudio, "session_id")
  for entry in entries:
    let diaryentries = allDiaryEntries[entry.id]
    let sessionAudios = allSessionAudios[entry.id]
    result.add(overviewSerialize(entry, sessionAudios, diaryentries))
