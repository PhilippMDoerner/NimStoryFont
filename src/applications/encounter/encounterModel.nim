import norm/[model, pragmas]
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import std/options
import ../location/locationModel
import constructor/defaults


type Encounter* {.defaults, tableName: ENCOUNTER_TABLE.} = ref object of Model
    description*: Option[string] = none(string)
    title*: Option[string] = none(string)
    diaryentry_id*: int64 = MODEL_INIT_ID
    location_id* {.fk: Location.} : Option[int64] = none(int64)
    order_index*: Option[int] = none(int)
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
implDefaults(Encounter)

proc newModel*(T: typedesc[Encounter]): Encounter = newEncounter()
proc newTableModel*(T: typedesc[Encounter]): Encounter = newEncounter()


type EncounterParentLocation* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL*: The parent location of a location, that an encounter happened 
    in]##
    name*: string = ""
implDefaults(EncounterParentLocation)

type EncounterLocation* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL*: The location an encounter happened in]##
    name*: string = ""
    parent_location_id*: Option[EncounterParentLocation] = some(newEncounterParentLocation())
implDefaults(EncounterLocation)


type EncounterSession* {.defaults, tableName: SESSION_TABLE.} = ref object of Model
    session_number*: int = -1
    is_main_session*: bool = true
implDefaults(EncounterSession)


type EncounterDiaryentry* {.defaults, tableName: DIARYENTRY_TABLE.} = ref object of Model
    session_id*: EncounterSession = newEncounterSession()
implDefaults(EncounterDiaryentry)


type EncounterRead* {.defaults, tableName: ENCOUNTER_TABLE.} = ref object of Model
    description*: Option[string] = none(string)
    title*: Option[string] = none(string)
    diaryentry_id*: EncounterDiaryentry = newEncounterDiaryentry()
    location_id*: Option[EncounterLocation] = some(newEncounterLocation())
    order_index*: Option[int] = none(int)
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
implDefaults(EncounterRead)

proc newModel*(T: typedesc[EncounterRead]): EncounterRead = newEncounterRead()




