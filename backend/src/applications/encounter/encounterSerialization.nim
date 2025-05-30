import std/[options, sequtils, sugar, strformat, strutils]
import norm/model
import ./encounterModel
import ./encounterUtils
import ../articleModel
import ../genericArticleRepository
import ../campaign/campaignModel
import ../character/[characterUtils, characterEncounterModel]
import ../location/[locationModel, locationRepository]
import ../../utils/[djangoDateTime/djangoDateTimeType, myStrutils]

type EncounterLocationSerializable* = object
  name: string
  name_full: string
  pk: int64
  parent_location_name: Option[string]

type ConnectionCharacter* = object
  name: string
  name_full: string
  pk: int64

type ConnectionEncounter = ConnectionCharacter

type EncounterConnectionSerializable* = object
  pk: int64
  encounter: int64
  encounter_details: ConnectionEncounter
  character: int64
  character_details: ConnectionCharacter

type EncounterSerializable* = object
  pk: int64
  description: Option[string]
  encounterConnections: seq[EncounterConnectionSerializable]
  name: string
  location: Option[int64]
  location_details: Option[EncounterLocationSerializable]
  title: Option[string]
  creation_datetime: DjangoDateTime
  update_datetime: DjangoDateTime
  diaryentry: int64
  order_index: Option[int]
  campaign_details: MinimumCampaignOverview

proc serializeEncounterLocation(
    entry: EncounterLocation, encounterParentLocations: seq[Location]
): EncounterLocationSerializable =
  let parentNames: string = encounterParentLocations.map(loc => loc.name).join(" - ")
  let hasParents = parentNames.len() > 0
  let fullLocationName =
    if hasParents:
      fmt"{parentNames} - {entry.name}"
    else:
      entry.name

  result = EncounterLocationSerializable(
    pk: entry.id,
    name: entry.name,
    name_full: fullLocationName,
    parent_location_name: entry.parent_location_id.map(ploc => ploc.name),
  )

proc serializeEncounterConnection(
    entry: EncounterRead, connection: CharacterEncounterRead
): EncounterConnectionSerializable =
  let encounterName = $entry
  result = EncounterConnectionSerializable(
    pk: connection.id,
    encounter: connection.encounter_id.id,
    character: connection.character_id.id,
    encounter_details: ConnectionEncounter(
      pk: connection.encounter_id.id, name: encounterName, name_full: encounterName
    ),
    character_details: ConnectionCharacter(
      pk: connection.character_id.id,
      name: connection.character_id.name,
      name_full: $connection.character_id,
    ),
  )

proc serializeEncounterRead*(
    entry: EncounterRead,
    encounterConnections: seq[CharacterEncounterRead],
    encounterLocationParents: seq[Location],
): EncounterSerializable =
  result = EncounterSerializable(
    pk: entry.id,
    description: entry.description,
    name: $entry,
    encounterConnections:
      encounterConnections.map(con => serializeEncounterConnection(entry, con)),
    location: entry.location_id.map(loc => loc.id),
    location_details: entry.location_id.map(
      loc => serializeEncounterLocation(loc, encounterLocationParents)
    ),
    title: entry.title,
    creation_datetime: entry.creation_datetime,
    update_datetime: entry.update_datetime,
    diaryentry: entry.diaryentry_id.id,
    order_index: entry.order_index,
    campaign_details: entry.diaryentry_id.session_id.campaign_id,
  )

proc serializeEncounterRead*(
    connection: DbConn, entry: EncounterRead
): EncounterSerializable =
  let encounterConnections = connection.getManyFromOne(entry, CharacterEncounterRead)

  let encounterLocation = entry.location_id
  let encounterLocationParents =
    if encounterLocation.isSome():
      connection.getParentLocations(encounterLocation.get().id)
    else:
      @[]

  result = serializeEncounterRead(entry, encounterConnections, encounterLocationParents)

proc serializeEncounterReads*(
    connection: DbConn, entries: seq[EncounterRead]
): seq[EncounterSerializable] =
  for entry in entries:
    let serializedEntry = connection.serializeEncounterRead(entry)
    result.add(serializedEntry)

proc serializeEncounter*(connection: DbConn, entry: Encounter): EncounterSerializable =
  let entryRead = connection.getEntryById(entry.id, EncounterRead)
  result = connection.serializeEncounterRead(entryRead)

type EncounterDiaryentrySerializable* = object
  session_number: int
  author_name: string
  is_main_session: 0 .. 1

proc serializeDiaryEntry(entry: EncounterDiaryentry): EncounterDiaryentrySerializable =
  result = EncounterDiaryentrySerializable(
    session_number: entry.session_id.session_number,
    author_name: entry.author_id.username,
    is_main_session: entry.session_id.is_main_session.int,
  )

type EncounterOverviewSerializable* = object
  article_type: ArticleType
  description*: Option[string]
  pk: int64
  name_full: string
  name: string
  campaign_details: MinimumCampaignOverview
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime
  diaryentry: int64
  title: Option[string]
  diaryentry_details: EncounterDiaryentrySerializable

proc overviewSerialize*(
    connection: DbConn, entry: EncounterRead
): EncounterOverviewSerializable =
  result = EncounterOverviewSerializable(
    article_type: ArticleType.atEncounter,
    description: entry.description.map(truncate),
    pk: entry.id,
    name_full: $entry,
    name: $entry,
    campaign_details: entry.diaryentry_id.session_id.campaign_id,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
    diaryentry: entry.diaryentry_id.id,
    title: entry.title,
    diaryentry_details: entry.diaryentry_id.serializeDiaryEntry(),
  )

proc overviewSerialize*(
    connection: DbConn, entries: seq[EncounterRead]
): seq[EncounterOverviewSerializable] =
  for entry in entries:
    result.add(connection.overviewSerialize(entry))
