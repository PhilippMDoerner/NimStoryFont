import questModel
import questUtils
import norm/sqlite
import ../genericArticleRepository
import ../session/[sessionUtils, sessionModel]
import ../campaign/campaignModel
import ../character/[characterModel, characterUtils]
import std/[options, sugar]
import ../../utils/[djangoDateTime/djangoDateTimeType, myStrutils]
import ../articleModel

type QuestCharacter* = object
  name: string
  name_full: string
  pk: Option[int64]

const groupCharacter =
  QuestCharacter(name: "Group", name_full: "Group", pk: none(int64))

proc serializeQuestCharacter(entry: Character): QuestCharacter =
  result = QuestCharacter(name: entry.name, name_full: $entry, pk: some(entry.id))

type QuestSession* = object
  pk: int64
  name: string
  session_number: int64
  session_date: DjangoDateTime
  is_main_session: bool
  is_main_session_int: 0 .. 1
  start_day: Option[int]
  end_day: Option[int]
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime
  campaign: int64
  campaign_details: MinimumCampaignOverview

proc serializeQuestSession(entry: SessionRead): QuestSession =
  result = QuestSession(
    pk: entry.id,
    name: $entry,
    session_number: entry.session_number,
    session_date: entry.session_date,
    is_main_session: entry.is_main_session,
    is_main_session_int: entry.is_main_session.int,
    start_day: entry.start_day,
    end_day: entry.end_day,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
  )

type QuestSerializable* = object
  pk: int64
  name: string
  status: string
  giver: Option[int64]
  giver_details: Option[QuestCharacter]
  taker: Option[int64]
  taker_details: QuestCharacter
  description: Option[string]
  abstract: Option[string]
  start_session: int64
  start_session_details: QuestSession
  campaign: int64
  campaign_details: MinimumCampaignOverview
  end_session: Option[int64]
  end_session_details: Option[QuestSession]
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime

proc serializeQuestRead*(connection: DbConn, entry: QuestRead): QuestSerializable =
  result = QuestSerializable(
    pk: entry.id,
    name: entry.name,
    status: entry.status,
    giver: entry.giver_id.map(giver => giver.id),
    giver_details: entry.giver_id.map(serializeQuestCharacter),
    taker: entry.taker_id.map(taker => taker.id),
    taker_details: entry.taker_id.map(serializeQuestCharacter).get(groupCharacter),
    description: entry.description,
    abstract: entry.abstract,
    start_session: entry.start_session_id.id,
    start_session_details: serializeQuestSession(entry.start_session_id),
    end_session: entry.end_session_id.map(endSession => endSession.id),
    end_session_details: entry.end_session_id.map(serializeQuestSession),
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
  )

proc serializeQuest*(connection: DbConn, entry: Quest): QuestSerializable =
  let entryRead = connection.getEntryById(entry.id, QuestRead)
  result = connection.serializeQuestRead(entryRead)

type QuestOverviewSerializable* = object
  article_type: ArticleType
  description: Option[string]
  pk: int64
  name_full: string
  name: string
  campaign_details: MinimumCampaignOverview
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime
  taker_details: QuestCharacter
  abstract: Option[string]
  status: string

proc overviewSerialize*(
    connection: DbConn, entry: QuestRead
): QuestOverviewSerializable =
  result = QuestOverviewSerializable(
    article_type: ArticleType.atQuest,
    description: entry.description.map(truncate),
    pk: entry.id,
    name_full: $entry,
    name: entry.name,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
    campaign_details: entry.campaign_id,
    taker_details: entry.taker_id.map(serializeQuestCharacter).get(groupCharacter),
    abstract: entry.abstract,
    status: entry.status,
  )

proc overviewSerialize*(
    connection: DbConn, entries: seq[QuestRead]
): seq[QuestOverviewSerializable] =
  for entry in entries:
    result.add(connection.overviewSerialize(entry))
