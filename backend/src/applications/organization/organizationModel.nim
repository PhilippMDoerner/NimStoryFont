import std/options
import norm/[model, pragmas]
import constructor/defaults
import ../campaign/campaignModel
import ../location/locationModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType

type Organization* {.defaults, tableName: ORGANIZATION_TABLE.} = ref object of Model
  name*: string = ""
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  description*: Option[string] = some("")
  leader*: Option[string] = some("")
  headquarter_id* {.fk: Location.}: Option[int64] = some(MODEL_INIT_ID)

implDefaults(Organization, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type OrganizationOverview* {.defaults, readOnly, tableName: ORGANIZATION_TABLE.} = ref object of Model
  name*: string = ""
  description*: Option[string] = none(string)
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()

implDefaults(OrganizationOverview, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type OrganizationParentLocation {.defaults, readOnly, tableName: LOCATION_TABLE.} = ref object of Model
  ##[HELPER MODEL: The parent location of a location, that a character 
    currently resides in]##
  name*: string = ""

implDefaults(
  OrganizationParentLocation, {DefaultFlag.defExported, DefaultFlag.defTypeConstr}
)

type OrganizationLocation* {.defaults, readOnly, tableName: LOCATION_TABLE.} = ref object of Model
  ##[HELPER MODEL: The location a character currently resides in]##
  name*: string = ""
  parent_location_id*: Option[OrganizationParentLocation] =
    some(new(OrganizationParentLocation))

implDefaults(OrganizationLocation, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type OrganizationRead* {.defaults, readOnly, tableName: ORGANIZATION_TABLE.} = ref object of Model
  name*: string = ""
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  description*: Option[string] = some("")
  leader*: Option[string] = some("")
  headquarter_id*: Option[OrganizationLocation] = some(new(OrganizationLocation))

implDefaults(OrganizationRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type OrganizationCharacter* {.defaults, readOnly, tableName: CHARACTER_TABLE.} = ref object of Model
  ##[A reduced Model of a story-character. Cut down to the bare minimum needed to
    make a list of characters with necessary meta data ]##
  alive*: bool = true
  name*: string = ""
  organization_id* {.fk: Organization.}: int64 = MODEL_INIT_ID

implDefaults(
  OrganizationCharacter, {DefaultFlag.defExported, DefaultFlag.defTypeConstr}
)

type OrganizationRelationship* {.defaults, tableName: ORGANIZATION_RELATIONSHIP_TABLE.} = ref object of Model
  organization_id* {.fk: Organization.}: int64 = MODEL_INIT_ID
  parent_organization_id* {.fk: Organization.}: int64 = MODEL_INIT_ID
  relationship*: string = ""

implDefaults(
  OrganizationRelationship, {DefaultFlag.defExported, DefaultFlag.defTypeConstr}
)
