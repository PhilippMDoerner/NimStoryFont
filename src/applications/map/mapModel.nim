import norm/[model, pragmas]
import options
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../campaign/campaignModel

type Map* {.defaults, tableName: MAP_TABLE} = ref object of Model
  icon: Option[string] = none(string)
  image: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
  name*: string = ""

implDefaults(Map)

proc newModel*(T: typedesc[Map]): Map = newMap()

proc `$`*(model: Map): string = 
    result = model.name