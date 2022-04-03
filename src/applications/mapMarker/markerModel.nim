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

implDefaults(Marker)
proc newModel*(T: typedesc[Marker]): Marker = newMarker()


type MarkerRead* {.defaults, tableName: MARKER_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  longitude*: int = 0
  latitude*: int = 0
  map_id*: Map = newModel(Map)
  location_id*: Location = newModel(Location)
  type_id*: Option[MarkerType] = some(newModel(MarkerType))
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  color*: Option[string] = some("")

implDefaults(MarkerRead)
proc newModel*(T: typedesc[MarkerRead]): MarkerRead = newMarkerRead()



type MarkerMap* {.defaults, tableName: MAP_TABLE.} = ref object of Model
  campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)
  name*: string = ""

implDefaults(MarkerMap)
proc newModel*(T: typedesc[MarkerMap]): MarkerMap = newMarkerMap()

type MarkerWithMapRead* {.defaults, tableName: MARKER_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  longitude*: int = 0
  latitude*: int = 0
  map_id*: MapRead = newModel(MapRead)
  location_id*: LocationRead = newModel(LocationRead)
  type_id*: Option[MarkerType] = some(newModel(MarkerType))
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  color*: Option[string] = some("")


implDefaults(MarkerWithMapRead)
proc newModel*(T: typedesc[MarkerWithMapRead]): MarkerWithMapRead = newMarkerWithMapRead()
