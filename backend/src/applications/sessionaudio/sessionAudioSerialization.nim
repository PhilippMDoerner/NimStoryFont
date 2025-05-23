import std/[options, strformat, sequtils, strutils, sugar, tables]
import norm/[model, sqlite]
import ./sessionaudioModel
import ./sessionaudioRepository
import ./sessionaudioUtils
import ../campaign/campaignModel
import ../sessionAudioTimestamp/timestampModel
import ../articleModel
import ../genericArticleRepository
import ../session/[sessionModel, sessionSerialization]
import ../../utils/djangoDateTime/[djangoDateTimeType]

type SessionAudioStub* = object
  isMainSessionInt: 0 .. 1
  sessionNumber: int

proc serializeSessionAudioStub(entry: SessionAudioRead): SessionAudioStub =
  result = SessionAudioStub(
    isMainSessionInt: entry.session_id.is_main_session.int,
    sessionNumber: entry.session_id.session_number,
  )

type SessionAudioNeighboursSerializable* = object
  priorSessionAudio: Option[SessionAudioStub]
  nextSessionAudio: Option[SessionAudioStub]

proc serializeSessionAudioNeighbours(
    priorSessionAudio: Option[SessionAudioRead],
    nextSessionAudio: Option[SessionAudioRead],
): SessionAudioNeighboursSerializable =
  result = SessionAudioNeighboursSerializable(
    priorSessionAudio: priorSessionAudio.map(serializeSessionAudioStub),
    nextSessionAudio: nextSessionAudio.map(serializeSessionAudioStub),
  )

type SessionAudioSerializable* = object
  session: int64
  session_details: SessionSerializable
  pk: int64
  audio_file: string
  sessionAudioNeighbours: SessionAudioNeighboursSerializable
  creation_datetime: DjangoDateTime
  update_datetime: DjangoDateTime

proc serializeSessionAudioRead*(
    connection: DbConn, entry: SessionAudioRead
): SessionAudioSerializable =
  let (priorSessionAudio, nextSessionAudio) = connection.getSessionAudioNeighbours(
    entry.session_id.campaign_id.name, entry.session_id.session_number,
    entry.session_id.is_main_session,
  )
  let session = connection.getEntryById(entry.session_id.id, SessionRead)

  result = SessionAudioSerializable(
    pk: entry.id,
    session: entry.session_id.id,
    session_details: connection.serializeSessionRead(session),
    audio_file: entry.audio_file,
    creation_datetime: entry.creation_datetime,
    update_datetime: entry.update_datetime,
    sessionAudioNeighbours:
      serializeSessionAudioNeighbours(priorSessionAudio, nextSessionAudio),
  )

proc serializeSessionAudio*(
    connection: DbConn, entry: SessionAudio
): SessionAudioSerializable =
  let fullEntry = connection.getEntryById(entry.id, SessionAudioRead)
  result = connection.serializeSessionAudioRead(fullEntry)

type SessionAudioSessionSerializable* = object
  pk: int64
  session_number: int
  is_main_session: bool
  is_main_session_int: 0 .. 1

proc serializeSessionAudioSession(
    entry: SessionAudioSession
): SessionAudioSessionSerializable =
  result = SessionAudioSessionSerializable(
    pk: entry.id,
    session_number: entry.session_number,
    is_main_session: entry.is_main_session,
    is_main_session_int: entry.is_main_session.int,
  )

type SessionAudioOverviewSerializable* = object
  article_type: ArticleType
  description*: string
  pk: int64
  name_full: string
  name: string
  campaign_details: MinimumCampaignOverview
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime
  session_details: SessionAudioSessionSerializable
  audio_url: string
  download_url: string

proc overviewSerialize(
    entry: SessionAudioRead, timestamps: seq[Timestamp]
): SessionAudioOverviewSerializable =
  let timestampNames = timestamps.map(timestamp => timestamp.name)
  result = SessionAudioOverviewSerializable(
    article_type: ArticleType.atSessionAudio,
    description: timestampNames.join(" - "),
    pk: entry.id,
    name_full: $entry,
    name: $entry,
    campaign_details: entry.session_id.campaign_id,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
    session_details: serializeSessionAudioSession(entry.session_id),
    audio_url: entry.audio_file,
    download_url: entry.audio_file.getDownloadUrl(),
  )

proc overviewSerialize*(
    connection: DbConn, entry: SessionAudioRead
): SessionAudioOverviewSerializable =
  let timestamps: seq[Timestamp] = connection.getManyFromOne(entry, Timestamp)
  result = overviewSerialize(entry, timestamps)

proc overviewSerialize*(
    connection: DbConn, entries: seq[SessionAudioRead]
): seq[SessionAudioOverviewSerializable] =
  let allTimestamps: Table[int64, seq[Timestamp]] =
    connection.getManyFromOne(entries, Timestamp, "session_audio_id")

  for entry in entries:
    let serializedEntry = overviewSerialize(entry, allTimestamps[entry.id])
    result.add(serializedEntry)
