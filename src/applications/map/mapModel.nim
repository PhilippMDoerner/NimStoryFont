import norm/[model, pragmas]
import ndb/sqlite
import std/[strutils, options]
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../campaign/campaignModel
import ../location/locationModel

  
type Map* {.defaults, tableName: MAP_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  image*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
  name*: string = ""

implDefaults(Map)

proc newModel*(T: typedesc[Map]): Map = newMap()

type FontAwesomeType = enum 
  ##Determines whehter an icon is supposed to come from 4.7 or 5
  VERSION5 = "fas"
  VERSION4 = "fa"

func to*(dbVal: DbValue, T: typedesc[FontAwesomeType]): FontAwesomeType =
  ## Allows converting the string value of a FontAwesomeType into the enum 
  let isStringValue = dbVal.kind == dvkString
  if not isStringValue:
    raise newException(ValueError, "Expected string value for FontAwesomeType column from database, but received {$dbVal.kind}")
  
  let dbValueString = dbVal.s
  result = parseEnum[FontAwesomeType](dbValueString)

type MapRead* {.defaults, tableName: MAP_TABLE.} = ref object of Model
  icon*: Option[string] = some("")
  image*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)
  name*: string = ""

implDefaults(MapRead)

proc newModel*(T: typedesc[MapRead]): MapRead = newMapRead()

type MarkerType*  {.defaults, tableName: MARKERTYPE_TABLE.} = ref object of Model
  name: string = ""
  icon*: string = ""
  is_text_marker*: bool = false
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  fontawesome_type*: FontAwesomeType = FontAwesomeType.VERSION5 
  color: string = ""

implDefaults(MarkerType)
proc newModel*(T: typedesc[MarkerType]): MarkerType = newMarkerType()

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
