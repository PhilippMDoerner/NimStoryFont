import characterModel
import ../item/itemModel
import ../encounter/[characterEncounterModel, encounterModel]
import ../image/imageModel
import ../playerclass/playerClassModel
import ../campaign/campaignModel
import ../organization/organizationModel
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[sugar, sequtils, options]
import ../genericArticleRepository
import ../../utils/databaseUtils
import norm/sqlite

#TODO: Do this once you've got general data fetching etc. set up properly across your stuff. That's basically step 2, step 1 being getting a first draft for it all going
#TODO: You'll need to define essentially the same serializers as you had in python. You may want to move the sub-serialization procs into their own module if you get conflicts
#TODO: Once you get going, this serializable will essentially be replaced by the one below
type CharacterSerializable* = object
    character*: CharacterRead
    images*: seq[Image]
    encounters*: seq[EncounterRead]
    items*: seq[ItemOverview]
    playerClassConnections*: seq[PlayerClass]
    

# type CharacterSerializable2* = object
#     player_character*: bool
#     alive*: bool 
#     name*: string
#     gender*: string
#     race*: string
#     title*: Option[string] 
#     description*: Option[string]
#     current_location: Option[int64]
#     current_location_details: JsonNode
#     creation_datetime*: DjangoDateTime
#     update_datetime*: DjangoDateTime 
#     campaign_id*: MinimumCampaignOverview
#     organization_details*: Option[OrganizationOverview]
#     items*: seq[ItemOverview]
#     encounters: seq[EncounterRead]


# proc getCurrentLocationDetails(entry: Option[CharacterLocation], locationPath: Option[string]): JsonNode =   
#     result = newJObject()
#     result.add("name_full", %locationPath)
        
#     if  entry.isSome():
#         let currentLocation: CharacterLocation = entry.get() 
#         let parentLocationName: Option[string] = if currentLocation.parent_location_id.isSome(): some(currentLocation.parent_location_id.get().name) else: none(string)
        
#         result.add("name", %currentLocation.name)
#         result.add("parent_location", %parentLocationName)
#         result.add("pk", %currentLocation.id)
#     else:
#         result.add("name", newJNull())
#         result.add("parent_location", newJNull())
#         result.add("pk", newJNull())

# proc getLocationId(entry: Option[CharacterLocation]): JsonNode =
#     result = if entry.isSome(): %entry.get().id else: newJNull()

# proc serializeCharacter*(entry: CharacterRead, images: seq[Image], encounters: seq[EncounterRead], items: seq[ItemOverview], classConnections: seq[PlayerClass], locationPath: Option[string]): CharacterSerializable2 =
#     let imagePaths = characterImages.map(imageEntry => imageEntry.image)
    
#     result = CharacterSerializable2(
#         player_character: entry.player_character,
#         alive: entry.alive,
#         name: entry.name,
#         gender: entry.gender,
#         race: entry.race,
#         title: entry.title,
#         description: entry.description,
#         current_location: getLocationId(entry.current_location_id)
#         current_location_details: getCurrentLocationDetails(entry.current_location_id, locationPath),
#         creation_datetime: entry.creation_datetime,
#         update_datetime: entry.update_datetime,
#         campaign_id: entry.campaign_id,
#         organization_details: entry.organization_id,
#         items: items
#     )

type CharacterOverviewSerializable* = object
    pk*: int64
    name*: string
    name_full*: string
    campaign_details*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime
    player_character*: bool
    alive*: bool
    images: seq[string]



proc serializeCharacterRead*(connection: DbConn, character: CharacterRead): CharacterSerializable =
    let images = connection.getManyFromOne(character, Image)
    let encounters = connection.getManyToMany(character, CharacterEncounterRead, EncounterRead)
    let playerClassConnections = connection.getManyToMany(character, PlayerClassConnectionRead, PlayerClass)
    let items = connection.getManyFromOne(character, ItemOverview)

    result = CharacterSerializable(
        character: character,
        images: images,
        items: items,
        encounters: encounters,
        playerClassConnections: playerClassConnections
    )

proc serializeCharacter*(connection: DbConn, entry: Character): CharacterSerializable =
    let entry = connection.getEntryById(entry.id, CharacterRead)
    result = connection.serializeCharacterRead(entry)




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


#TODO: This appears to solely be needed for its ability to instantiate getEntryByName for characterRead
proc serialize(connection: DbConn, campaignName: string, entryName: string): CharacterSerializable =
    let entry = connection.getEntryByName(campaignName, entryName, CharacterRead)
    result = connection.serializeCharacterRead(entry)