import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[options]
import constructor/defaults

type Location* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
  name*: string = ""
  description*: Option[string] = some("")
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  parent_location_id* {.fk: Location.}: Option[int64] = some(MODEL_INIT_ID)
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
    # The id of the campaign that this character occurred in

implDefaults(Location, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type GrandParentLocation* {.defaults, readOnly, tableName: LOCATION_TABLE.} = ref object of Model
  name*: string = ""

implDefaults(GrandParentLocation, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ParentLocation* {.defaults, readOnly, tableName: LOCATION_TABLE.} = ref object of Model
  name*: string = ""
  parent_location_id*: Option[GrandParentLocation] = some(new(GrandParentLocation))

implDefaults(ParentLocation, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type LocationRead* {.defaults, readOnly, tableName: LOCATION_TABLE.} = ref object of Model
  name*: string = ""
  description*: Option[string] = some("")
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  parent_location_id*: Option[ParentLocation] = some(new(ParentLocation))
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)
    # The id of the campaign that this character occurred in

implDefaults(LocationRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
