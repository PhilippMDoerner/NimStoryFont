import norm/[model, pragmas]
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import std/options
import ../campaign/campaignModel
import ../location/locationModel
import ../image/imageModel
import constructor/defaults

type Organization* {.defaults, tableName: ORGANIZATION_TABLE.} = ref object of Model
    name*: string = ""
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    description*: Option[string] = none(string)
    leader*: Option[string] = none(string)
    headquarter_id* {.fk: Location.}: Option[int64] = none(int64)

implDefaults(Organization)
proc newModel*(T: typedesc[Organization]): Organization = newOrganization()
proc newTableModel*(T: typedesc[Organization]): Organization = newOrganization()


type OrganizationOverview* {.defaults, tableName: ORGANIZATION_TABLE.} = ref object of Model
    name*: string = ""
    campaign_id*: int64 = MODEL_INIT_ID

implDefaults(OrganizationOverview)
proc newModel*(T: typedesc[OrganizationOverview]): OrganizationOverview = newOrganizationOverview()


type OrganizationParentLocation {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL: The parent location of a location, that a character 
    currently resides in]##
    name: string = ""

implDefaults(OrganizationParentLocation)


type OrganizationLocation* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL: The location a character currently resides in]##
    name*: string = ""
    parent_location_id*: Option[OrganizationParentLocation] = none(OrganizationParentLocation)

implDefaults(OrganizationLocation)
proc newModel*(T: typedesc[OrganizationLocation]): OrganizationLocation = newOrganizationLocation()


type OrganizationRead* {.defaults, tableName: ORGANIZATION_TABLE.} = ref object of Model
    name*: string = ""
    campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    description*: Option[string] = none(string)
    leader*: Option[string] = none(string)
    headquarter_id*: Option[OrganizationLocation] = none(OrganizationLocation)

implDefaults(OrganizationRead)
proc newModel*(T: typedesc[OrganizationRead]): OrganizationRead = newOrganizationRead()


type OrganizationCharacter* {.defaults, tableName: CHARACTER_TABLE.} = ref object of Model
    ##[A reduced Model of a story-character. Cut down to the bare minimum needed to
    make a list of characters with necessary meta data ]##
    alive*: bool = true
    name*: string = ""
    organization_id* {.fk: Organization.} : int64 = MODEL_INIT_ID

implDefaults(OrganizationCharacter)
proc newModel*(T: typedesc[OrganizationCharacter]): OrganizationCharacter = newOrganizationCharacter()


type OrganizationSerializable* = ref object
    organization*: OrganizationRead
    members*: seq[OrganizationCharacter]
    images*: seq[Image]
