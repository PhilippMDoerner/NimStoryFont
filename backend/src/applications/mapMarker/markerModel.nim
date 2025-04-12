import norm/[model, pragmas]
import std/[options]
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../mapMarkerType/markerTypeModel
import ../map/mapModel
import ../location/locationModel
import ../campaign/campaignModel

type Marker* {.defaults, tableName: MARKER_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  longitude*: int = 0
  latitude*: int = 0
  map_id* {.fk: Map.}: int64 = MODEL_INIT_ID
  location_id* {.fk: Location.}: int64 = MODEL_INIT_ID
  type_id* {.fk: MarkerType.}: Option[int64] = some(MODEL_INIT_ID)
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  color*: Option[string] = some("")

implDefaults(Marker, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type MarkerMap* {.defaults, readOnly, tableName: MAP_TABLE.} = ref object of Model
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)
  icon*: Option[string] = some("")
  name*: string = ""

implDefaults(MarkerMap, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type MarkerRead* {.defaults, readOnly, tableName: MARKER_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  longitude*: int = 0
  latitude*: int = 0
  map_id*: MarkerMap = new(MarkerMap)
  location_id*: LocationRead = new(LocationRead)
  type_id*: Option[MarkerType] = some(new(MarkerType))
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  color*: Option[string] = some("")

implDefaults(MarkerRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

