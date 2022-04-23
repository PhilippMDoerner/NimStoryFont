import characterModel
import ../item/itemModel
import ../encounter/[encounterModel, encounterSerialization]
import ../image/imageModel
import ../playerclass/playerClassModel
import ../location/[locationModel, locationRepository]
import ../campaign/campaignModel
import ../organization/organizationModel
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[sugar, sequtils, options, strutils, strformat]
import ../genericArticleRepository
import ../../utils/databaseUtils
import norm/sqlite
import characterEncounterModel

type CharacterLocationSerializable* = object
    pk*: int64
    name*: string
    name_full*: Option[string]
    parent_location*: Option[string]

type CharacterSerializable* = object
    pk*: int64
    player_character*: bool
    player_class_connections*: seq[PlayerClass]
    alive*: bool 
    name*: string
    gender*: string
    race*: string
    title*: Option[string] 
    description*: Option[string]
    current_location*: Option[int64]
    current_location_details*: Option[CharacterLocationSerializable]
    creation_datetime*: DjangoDateTime
    update_datetime*: DjangoDateTime 
    campaign_id*: int64
    campaign_details*: MinimumCampaignOverview
    organization*: Option[int64]
    organization_details*: Option[OrganizationOverview]
    items*: seq[ItemOverview]
    encounters*: seq[EncounterSerializable]
    images*: seq[string]

proc getCurrentLocationDetails(connection: DbConn, entry: Option[CharacterLocation]): Option[CharacterLocationSerializable] =
    if entry.isNone():
        return none(CharacterLocationSerializable)

    let currentLocation: CharacterLocation = entry.get() 
    let parentLocationName: Option[string] = if currentLocation.parent_location_id.isSome(): some(currentLocation.parent_location_id.get().name) else: none(string)
    
    let parentLocations: seq[Location] = connection.getParentLocations(currentLocation.id)
    let locationPath = parentLocations.map(loc => loc.name).join(" - ")

    result = some(CharacterLocationSerializable(
        pk: currentLocation.id,
        name: currentLocation.name,
        parent_location: parentLocationName,
        name_full: some(locationPath)
    ))


proc serializeCharacterRead*(connection: DbConn, entry: CharacterRead): CharacterSerializable =
    let characterImages = connection.getManyFromOne(entry, Image)
    let imagePaths = characterImages.map(imageEntry => imageEntry.image)
    let characterLocation: Option[CharacterLocationSerializable] = connection.getCurrentLocationDetails(entry.current_location_id)
    let characterLocationId: Option[int64] = if characterLocation.isSome(): some(characterLocation.get().pk) else: none(int64) 
    let items = connection.getManyFromOne(entry, ItemOverview)
    let characterClasses: seq[PlayerClass] = connection.getManyToMany(entry, PlayerClassConnectionRead, PlayerClass)
    let organizationId: Option[int64] = if entry.organization_id.isSome(): some(entry.organization_id.get().id) else: none(int64) 
    
    let encounters: seq[EncounterRead] = connection.getManyToMany(entry, CharacterEncounterRead, EncounterRead)
    let serializedEncounters: seq[EncounterSerializable] = encounters.map(enc => connection.serializeEncounterRead(enc))

    result = CharacterSerializable(
        pk: entry.id,
        player_character: entry.player_character,
        alive: entry.alive,
        name: entry.name,
        gender: entry.gender,
        race: entry.race,
        title: entry.title,
        description: entry.description,
        current_location: characterLocationId,
        current_location_details: characterLocation,
        creation_datetime: entry.creation_datetime,
        update_datetime: entry.update_datetime,
        campaign_id: entry.campaign_id.id,
        campaign_details: entry.campaign_id,
        organization_details: entry.organization_id,
        items: items,
        images: imagePaths,
        organization: organizationId,
        player_class_connections: characterClasses,
        encounters: serializedEncounters
    )

proc serializeCharacter*(connection: DbConn, entry: Character): CharacterSerializable =
    let entry = connection.getEntryById(entry.id, CharacterRead)
    result = connection.serializeCharacterRead(entry)



type CharacterOverviewSerializable* = object
    pk*: int64
    name*: string
    name_full*: string
    campaign_details*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime
    player_character*: bool
    alive*: bool
    images*: seq[string]

proc serializeCharacterOverview*(connection: DbConn, entry: CharacterOverview): CharacterOverviewSerializable =
    let images = if entry.player_character: getManyFromOne(entry, Image) else: @[]
    let imagePaths = images.map(entry => entry.image)

    result = CharacterOverviewSerializable(
        pk: entry.id,
        name: entry.name,
        name_full: entry.name, #TODO: get rid of name_full, you have to refactor the frontend to instead set the "dead" sign itself instead of relying on the sent name
        campaign_details: entry.campaign_id,
        update_datetime: entry.update_datetime,
        player_character: entry.player_character,
        alive: entry.alive,
        images: imagePaths
    )



type CharacterEncounterReadSerializable* = CharacterEncounterRead
proc serializeCharacterEncounterRead*(connection: DbConn, entry: CharacterEncounterRead): CharacterEncounterReadSerializable =
    result = entry