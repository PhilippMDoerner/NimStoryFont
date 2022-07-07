import characterModel
import ../item/itemModel
import ../encounter/[encounterModel, encounterSerialization, encounterUtils]
import ../image/[imageSerialization, imageModel, imageUtils]
import ../location/[locationModel, locationRepository]
import ../campaign/campaignModel
import ../organization/organizationModel
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[sugar, sequtils, options, strutils, strformat, algorithm, tables]
import ../genericArticleRepository
import ../../utils/[myStrutils, databaseUtils]
import norm/sqlite
import ../articleModel
import ../playerclass/[playerClassSerialization, playerClassModel]
import characterEncounterModel
import characterService
import characterUtils

type CharacterLocationSerializable* = object
    pk*: int64
    name*: string
    name_full*: Option[string]
    parent_location*: Option[string]


type CharacterPlayerClassConnectionSerializable* = object
    pk*: int64
    player_class*: int64
    character*: int64
    player_class_details*: PlayerClassSerializable

proc serializePlayerClassConnection(entry: PlayerClassConnectionRead): CharacterPlayerClassConnectionSerializable =
    result = CharacterPlayerClassConnectionSerializable(
        pk: entry.id,
        player_class: entry.player_class_id.id,
        character: entry.character_id,
        player_class_details: entry.player_class_id.serializePlayerClass()
    )

type CharacterSerializable* = object
    pk*: int64
    player_character*: bool
    player_class_connections*: seq[CharacterPlayerClassConnectionSerializable]
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
    images*: seq[ImageSerializable]

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
    let characterImages = connection.getManyFromOne(entry, Image).map(serializeImage)
    let characterLocation: Option[CharacterLocationSerializable] = connection.getCurrentLocationDetails(entry.current_location_id)
    let characterLocationId: Option[int64] = characterLocation.map(charLoc => charLoc.pk)
    let items = connection.getManyFromOne(entry, ItemOverview)
    let characterClasses: seq[PlayerClassConnectionRead] = connection.getManyFromOne(entry, PlayerClassConnectionRead)
    let organizationId: Option[int64] = entry.organization_id.map(org => org.id) 
    
    var encounters: seq[EncounterRead] = connection.getManyToMany(entry, CharacterEncounterRead, EncounterRead)
    encounters.sort((enc1, enc2) => enc2.diaryentry_id.session_id.session_number - enc1.diaryentry_id.session_id.session_number)
    
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
        images: characterImages,
        organization: organizationId,
        player_class_connections: characterClasses.map(serializePlayerClassConnection),
        encounters: serializedEncounters
    )

proc serializeCharacter*(connection: DbConn, entry: Character): CharacterSerializable =
    let entry = connection.getEntryById(entry.id, CharacterRead)
    result = connection.serializeCharacterRead(entry)

proc serializeCharacter*(connection: DbConn, entry: OrganizationMembership): CharacterSerializable =
    let entry = connection.getEntryById(entry.member_id, CharacterRead)
    result = connection.serializeCharacterRead(entry)


type CharacterOverviewSerializable* = object
    article_type*: ArticleType
    description: Option[string]
    pk*: int64
    name*: string
    name_full*: string
    campaign_details*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime
    player_character*: bool
    alive*: bool
    images*: seq[string]


proc overviewSerialize*(entry: CharacterOverview, entryImages: seq[Image]): CharacterOverviewSerializable =
    let imagePaths = entryImages.map(getImagePath)

    result = CharacterOverviewSerializable(
        article_type: ArticleType.atCharacter,
        description: entry.description.map(truncate),
        pk: entry.id,
        name: entry.name,
        name_full: entry.name, #TODO: get rid of name_full, you have to refactor the frontend to instead set the "dead" sign itself instead of relying on the sent name
        campaign_details: entry.campaign_id,
        update_datetime: entry.update_datetime,
        player_character: entry.player_character,
        alive: entry.alive,
        images: imagePaths
    )

proc overviewSerialize*(connection: DbConn, entry: CharacterOverview): CharacterOverviewSerializable =
    let images = if entry.player_character: getManyFromOne(entry, Image) else: @[]
    result = overviewSerialize(entry, images)

proc overviewSerialize*(connection: DbConn, entries: seq[CharacterOverview]): seq[CharacterOverviewSerializable] =
    let playerCharacterIds: seq[int64] = entries.filter(entry => entry.player_character).map(entry => entry.id)
    let playerCharacterImages: Table[int64, seq[Image]] = connection.getCharacterImages(playerCharacterIds)

    for entry in entries:
        let images: seq[Image] = if playerCharacterImages.hasKey(entry.id): playerCharacterImages[entry.id] else: @[]
        let serializedEntry = overviewSerialize(entry, images)
        result.add(serializedEntry)


type ConnectionDetailsSerializable* = object
    name: Option[string]
    name_full: string
    pk: int64


type CharacterEncounterReadSerializable* = object
    pk: int64
    encounter: int64
    encounter_details: ConnectionDetailsSerializable
    character: int64
    character_details: ConnectionDetailsSerializable

proc serializeCharacterEncounterRead*(connection: DbConn, entry: CharacterEncounterRead): CharacterEncounterReadSerializable =
    result = CharacterEncounterReadSerializable(
        pk: entry.id,
        encounter: entry.encounter_id.id,
        character: entry.character_id.id,
        encounter_details: ConnectionDetailsSerializable(
            name: entry.encounter_id.title,
            name_full: $entry.encounter_id,
            pk: entry.encounter_id.id
        ),
        character_details: ConnectionDetailsSerializable(
            name: some(entry.character_id.name),
            name_full: $entry.character_id,
            pk: entry.character_id.id
        )
    )