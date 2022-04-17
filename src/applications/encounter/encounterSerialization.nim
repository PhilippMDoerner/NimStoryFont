import norm/model
import encounterModel
import ../genericArticleRepository
import std/[options, sequtils, sugar, strformat, strutils]
import ../campaign/campaignModel
import ../character/characterEncounterModel
import ../location/locationRepository
import ../../utils/djangoDateTime/djangoDateTimeType


type EncounterLocationSerializable* = object
    name: string
    name_full: string
    pk: int64
    parent_location_name: Option[string]

type EncounterSerializable* = object
    pk: int64
    description: Option[string]
    encounterConnections: seq[CharacterEncounterRead]
    name: string
    location: Option[int64]
    location_details: Option[EncounterLocationSerializable]
    title: Option[string]
    creation_datetime: DjangoDateTime
    update_datetime: DjangoDateTime
    diaryentry: int64
    order_index: Option[int]
    campaign_details: MinimumCampaignOverview


type EncounterOverviewSerializable* = EncounterRead

proc serializeEncounterLocation(connection: DbConn, entry: EncounterLocation): EncounterLocationSerializable =
    let encounterParentLocations = connection.getParentLocations(entry.id)
    result = EncounterLocationSerializable(
        pk: entry.id,
        name: entry.name,
        name_full: encounterParentLocations.map(loc => loc.name).join(" - "),
        parent_location_name: entry.parent_location_id.map(ploc => ploc.name)
    )

proc serializeEncounterRead*(connection: DbConn, entry: EncounterRead): EncounterSerializable =
    let name = fmt"{entry.diaryentry_id.session_id.session_number} - {entry.location_id.map(entry => entry.name)}"
    result = EncounterSerializable(
        pk: entry.id,
        description: entry.description,
        name: name,
        location: entry.location_id.map(loc => loc.id),
        location_details: entry.location_id.map(loc => connection.serializeEncounterLocation(loc)),
        title: entry.title,
        creation_datetime: entry.creation_datetime,
        update_datetime: entry.update_datetime,
        diaryentry: entry.diaryentry_id.id,
        order_index: entry.order_index,
        campaign_details: connection.getEntryById(entry.diaryentry_id.session_id.campaign_id, MinimumCampaignOverview)
    )

proc serializeEncounter*(connection: DbConn, entry: Encounter): EncounterSerializable =
    let entryRead = connection.getEntryById(entry.id, EncounterRead)
    result = connection.serializeEncounterRead(entryRead)

proc overviewSerialize*(connection: DbConn, entry: EncounterRead): EncounterOverviewSerializable =
    result = entry
