import std/[options]
import norm/[model, pragmas]
import constructor/defaults
import ../campaign/campaignModel
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants

type Map* {.defaults, tableName: MAP_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  image*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
  name*: string = ""

implDefaults(Map, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type MapRead* {.defaults, readOnly, tableName: MAP_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  image*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)
  name*: string = ""

implDefaults(MapRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
