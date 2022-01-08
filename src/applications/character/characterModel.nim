import norm/[model, pragmas]
import std/[options]
import ../campaign/campaignModel
import ../item/itemModel
import ../organization/organizationModel
import ../encounter/encounterModel
import ../location/locationModel
import ../image/imageModel
import ../playerclass/playerClassModel
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType


type Character* {.tableName: CHARACTER_TABLE.} = ref object of Model
    ##[TableModel of the table of story characters. ]##
    player_character*: bool #Whether the character is controlled by a player or not
    alive*: bool
    name*: string
    gender*: string
    race*: string
    title*: Option[string] # A title the character might have, e.g. "Lord", "Duke", "Doctor"
    description*: Option[string] # A description of the character
    current_location_id* {.fk: Location.} : Option[int] # The id of the location at which the character is currently located
    creation_datetime*: DjangoDateTime
    update_datetime*: DjangoDateTime
    campaign_id* {.fk: Campaign.}: int64 # The id of the campaign that this character occurred in
    organization_id* {.fk: Organization.} : Option[int64]

type CharacterParentLocation {.tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL: The parent location of a location, that a character 
    currently resides in]##
    name*: string


type CharacterLocation* {.tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL: The location a character currently resides in]##
    name*: string
    parent_location_id*: Option[CharacterParentLocation]


type CharacterRead* {.tableName: CHARACTER_TABLE.} = ref object of Model
    ##[An extended Model of a story-character. Instead of the foreign-key ids it contains
    direct (reduced) representations of the datasets that the foreign-keys link to. ]##
    player_character*: bool
    alive*: bool
    name*: string
    gender*: string
    race*: string
    title*: Option[string]
    description*: Option[string]
    current_location_id*: Option[CharacterLocation]
    creation_datetime*: DjangoDateTime
    update_datetime*: DjangoDateTime
    campaign_id*: MinimumCampaignOverview
    organization_id*: Option[OrganizationOverview]

type CharacterOverview* {.tableName: CHARACTER_TABLE.} = ref object of Model
    ##[A reduced Model of a story-character. Cut down to the bare minimum needed to
    make a list of characters with necessary meta data ]##
    player_character*: bool
    alive*: bool
    name*: string
    update_datetime*: DjangoDateTime
    campaign_id*: MinimumCampaignOverview 


proc newCharacterParentLocation(name: string = "none"): CharacterParentLocation =
    result = CharacterParentLocation(name: name)


proc newCharacterLocation(
    name: string = "",
    parentLocation: Option[CharacterParentLocation] = some(newCharacterParentLocation()),
): CharacterLocation =
    result = CharacterLocation(
        name: name, 
        parent_location_id: parentLocation
    )


proc newCharacterRead(
    isPlayerCharacter: bool = false,
    alive: bool = true,
    name: string = "",
    gender: string = "",
    race: string = "",
    title: Option[string] = none(string),
    description: Option[string] = none(string),
    creationDatetime: DjangoDateTime = djangoDateTimeType.now(),
    updateDatetime: DjangoDateTime = djangoDateTimeType.now(),
    campaign: MinimumCampaignOverview = newMinimumCampaignOverview(),
    characterLocation: Option[CharacterLocation] = some(newCharacterLocation()),
): CharacterRead =
    ##[For use with norm on GET request]##
    result = CharacterRead(
        player_character: isPlayerCharacter,
        alive: alive,
        name: name,
        gender: gender,
        race: race,
        title: title,
        description: description,
        current_location_id: characterLocation,
        update_datetime: updateDatetime,
        creation_datetime: creationDatetime,
        campaign_id: campaign
    )


type CharacterSerializable* = ref object
    character*: CharacterRead
    images*: seq[Image]
    encounters*: seq[EncounterRead]
    items*: seq[ItemOverview]
    playerClassConnections*: seq[PlayerClass]


proc newCharacter(
    isPlayerCharacter: bool = false,
    alive: bool = true,
    name: string = "",
    gender: string = "",
    race: string = "",
    title: Option[string] = none(string),
    description: Option[string] = none(string),
    creationDatetime: DjangoDateTime = djangoDateTimeType.now(),
    updateDatetime: DjangoDateTime = djangoDateTimeType.now(),
    campaign: int = -1,
    characterLocation: Option[int] = none(int),
): Character =
    ##[For use... where? Just so that this also has a creation function I guess]##
    result = Character(
        player_character: isPlayerCharacter,
        alive: alive,
        name: name,
        gender: gender,
        race: race,
        title: title,
        description: description,
        current_location_id: characterLocation,
        update_datetime: updateDatetime,
        creation_datetime: creationDatetime,
        campaign_id: campaign
    )


proc newCharacterOverview(
    is_player_character: bool = false,
    alive: bool = true,
    name: string = "",
    update_datetime: DjangoDateTime = djangoDateTimeType.now(),
    campaign: MinimumCampaignOverview = newMinimumCampaignOverview()
): CharacterOverview =
    result = CharacterOverview(
        player_character: is_player_character,
        alive: alive,
        name: name,
        update_datetime: update_datetime,
        campaign_id: campaign
    )


proc newModel*(T: typedesc[Character]): Character =
    ##[Enables generic instantiation of the model. This enable the use of 
    generic methods that only read the database in genericArticleRepository ]##
    result = newCharacter()


proc newTableModel*(T: typedesc[Character]): Character =
    ##[Enables generic instantiation of the model as a Table Model.
    This enables the use of generic methods to create, update and delete 
    entries from the database from the genericArticleRepository ]##
    result = newCharacter()


proc newModel*(T: typedesc[CharacterOverview]): CharacterOverview =
    ##[Enables generic instantiation of the model. This enable the use of 
    generic methods that only read the database in genericArticleRepository ]##
    result = newCharacterOverview()


proc newModel*(T: typedesc[CharacterRead]): CharacterRead =
    ##[Enables generic instantiation of the model. This enable the use of 
    generic methods that only read the database in genericArticleRepository ]##
    result = newCharacterRead()