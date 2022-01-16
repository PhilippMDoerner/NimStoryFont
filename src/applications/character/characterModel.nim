import norm/[model, pragmas]
import std/[options]
import ../campaign/campaignModel
import ../organization/organizationModel
import ../location/locationModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults


##[This file defines models that can be used with SQL Tables.
Every model's field correspond to a table column. Every id field, even if an fk field
is always defined with an id64 or another model. There's also a default value associated
with each field, to make instantiation easier. `implDefaults` provides a constructor for
the given type if it has been given the `defaults` pragma.
The `newModel` methods are necessary for generic access to models for select statements made
by the genericArticleRepository.
The `newTableModel`procs are necessary for generic access to table models for insert/update/delete statement
made by the genericArticleRepository.
]##

type Character* {.defaults, tableName: CHARACTER_TABLE.} = ref object of Model
    ##[TableModel of the table of story characters. ]##
    player_character*: bool = false#Whether the character is controlled by a player or not
    alive*: bool = true
    name*: string = ""
    gender*: string = ""
    race*: string = ""
    title*: Option[string] = none(string) # A title the character might have, e.g. "Lord", "Duke", "Doctor"
    description*: Option[string] = none(string) # A description of the character
    current_location_id* {.fk: Location.} : Option[int64] = none(int64) # The id of the location at which the character is currently located
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID # The id of the campaign that this character occurred in
    organization_id* {.fk: Organization.} : Option[int64] = none(int64)

implDefaults(Character)

##[Enables generic instantiation of the model. This enable the use of 
generic methods that only read the database in genericArticleRepository ]##
proc newModel*(T: typedesc[Character]): Character = newCharacter()

##[Enables generic instantiation of the model as a Table Model.
This enables the use of generic methods to create, update and delete 
entries from the database from the genericArticleRepository ]##
proc newTableModel*(T: typedesc[Character]): Character = newCharacter()



type CharacterParentLocation {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL: The parent location of a location, that a character 
    currently resides in]##
    name*: string = ""

implDefaults(CharacterParentLocation)


type CharacterLocation* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL: The location a character currently resides in]##
    name*: string =""
    parent_location_id*: Option[CharacterParentLocation] = none(CharacterParentLocation)

implDefaults(CharacterLocation)



type CharacterRead* {.defaults, tableName: CHARACTER_TABLE.} = ref object of Model
    ##[An extended Model of a story-character. Instead of the foreign-key ids it contains
    direct (reduced) representations of the datasets that the foreign-keys link to. ]##
    player_character*: bool = false
    alive*: bool = true
    name*: string = ""
    gender*: string = ""
    race*: string = ""
    title*: Option[string] = none(string)
    description*: Option[string] = none(string)
    current_location_id*: Option[CharacterLocation] = none(CharacterLocation)
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)
    organization_id*: Option[OrganizationOverview] = none(OrganizationOverview)

implDefaults(CharacterRead)
##[Enables generic instantiation of the model. This enable the use of 
generic methods that only read the database in genericArticleRepository ]##
proc newModel*(T: typedesc[CharacterRead]): CharacterRead = newCharacterRead()


type CharacterOverview* {.defaults, tableName: CHARACTER_TABLE.} = ref object of Model
    ##[A reduced Model of a story-character. Cut down to the bare minimum needed to
    make a list of characters with necessary meta data ]##
    player_character*: bool = false
    alive*: bool = true
    name*: string = ""
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)

implDefaults(CharacterOverview)

##[Enables generic instantiation of the model. This enable the use of 
generic methods that only read the database in genericArticleRepository ]##
proc newModel*(T: typedesc[CharacterOverview]): CharacterOverview = result = newCharacterOverview()
 
