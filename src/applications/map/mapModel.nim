import norm/[model, pragmas]
import std/[options]
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../campaign/campaignModel
  
type Map* {.defaults, tableName: MAP_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  image*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
  name*: string = ""

implDefaults(Map)

proc newModel*(T: typedesc[Map]): Map = newMap()

type MapRead* {.defaults, tableName: MAP_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  image*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)
  name*: string = ""

implDefaults(MapRead)

proc newModel*(T: typedesc[MapRead]): MapRead = newMapRead()
