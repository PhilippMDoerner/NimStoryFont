import norm/[model, pragmas]
import lowdb/sqlite
import std/[strutils, options]
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings

type FontAwesomeType* = enum 
  ##Determines whehter an icon is supposed to come from 4.7 or 5
  VERSION5 = "fas"
  VERSION4 = "fa"

func dbType*(T: typedesc[FontAwesomeType]): string = "TEXT"
func dbValue*(val: FontAwesomeType): DbValue = dbValue($val)
func to*(dbVal: DbValue, T: typedesc[FontAwesomeType]): FontAwesomeType =
  ## Allows converting the string value of a FontAwesomeType into the enum 
  let isStringValue = dbVal.kind == dvkString
  if not isStringValue:
    raise newException(ValueError, "Expected string value for FontAwesomeType column from database, but received {$dbVal.kind}")
  
  let dbValueString = dbVal.s
  result = parseEnum[FontAwesomeType](dbValueString)


type MarkerType*  {.defaults, tableName: MARKERTYPE_TABLE.} = ref object of Model
  name*: string = ""
  icon*: string = ""
  is_text_marker*: bool = false
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  fontawesome_type*: FontAwesomeType = FontAwesomeType.VERSION5 
  color*: string = ""

implDefaults(MarkerType, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

