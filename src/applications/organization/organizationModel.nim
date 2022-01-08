import norm/[model, pragmas]
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType
import std/options
import ../campaign/campaignModel
import ../image/imageModel

type Organization* {.tableName: ORGANIZATION_TABLE.} = ref object of Model
    name: string
    campaign_id*: int64
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime
    description: Option[string]
    leader: Option[string]
    headquarter_id: Option[int64]


proc newOrganization(
    name = "",
    campaign_id = -1,
    update_datetime = djangoDateTimeType.now(),
    creation_datetime = djangoDateTimeType.now(),
    description = none(string),
    leader = none(string),
    headquarter_id = none(int64)
): Organization =
    result = Organization(
        name: name,
        campaign_id: campaign_id,
        update_datetime: update_datetime,
        creation_datetime: creation_datetime,
        description: description,
        leader: leader,
        headquarter_id: headquarter_id
    )

type OrganizationOverview* {.tableName: ORGANIZATION_TABLE.} = ref object of Model
    name: string
    campaign_id*: int64

proc newOrganizationOverview(name = "", campaign_id = -1): OrganizationOverview =
    result = OrganizationOverview(name: name, campaign_id: campaign_id)


type OrganizationParentLocation {.tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL: The parent location of a location, that a character 
    currently resides in]##
    name*: string


type OrganizationLocation* {.tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL: The location a character currently resides in]##
    name*: string
    parent_location_id*: Option[OrganizationParentLocation]

type OrganizationRead* {.tableName: ORGANIZATION_TABLE.} = ref object of Model
    name: string
    campaign_id*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime
    description: Option[string]
    leader: Option[string]
    headquarter_id: Option[OrganizationLocation]

proc newOrganizationRead(
    name = "",
    campaign_id = newMinimumCampaignOverview(),
    update_datetime = djangoDateTimeType.now(),
    creation_datetime = djangoDateTimeType.now(),
    description = none(string),
    leader = none(string),
    headquarter_id = none(OrganizationLocation)
): OrganizationRead =
    result = OrganizationRead(
        name: name,
        campaign_id: campaign_id,
        update_datetime: update_datetime,
        creation_datetime: creation_datetime,
        description: description,
        leader: leader,
        headquarter_id: headquarter_id
    )


type OrganizationCharacter* {.tableName: CHARACTER_TABLE.} = ref object of Model
    ##[A reduced Model of a story-character. Cut down to the bare minimum needed to
    make a list of characters with necessary meta data ]##
    alive*: bool
    name*: string

proc newOrganizationCharacter(name = "", alive = true): OrganizationCharacter =
    result = OrganizationCharacter(name: name, alive: alive)

type OrganizationSerializable* = ref object
    organization: OrganizationRead
    members: seq[OrganizationCharacter]
    images: seq[Image]


proc newModel*(T: typedesc[OrganizationCharacter]): OrganizationCharacter = 
    result = newOrganizationCharacter()
proc newModel*(T: typedesc[OrganizationRead]): OrganizationRead = 
    result = newOrganizationRead()
proc newModel*(T: typedesc[OrganizationOverview]): OrganizationOverview = 
    result = newOrganizationOverview()
proc newModel*(T: typedesc[Organization]): Organization = 
    result = newOrganization()
proc newTableModel*(T: typedesc[Organization]): Organization = 
    result = newOrganization()

