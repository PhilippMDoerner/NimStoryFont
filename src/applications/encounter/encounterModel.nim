import norm/[model, pragmas]
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[options]
import ../location/locationModel
import ../diaryentry/diaryEntryModel
import ../campaign/campaignModel
import constructor/defaults

const ORDER_INDEX_INCREMENT* = 10

type Encounter* {.defaults, tableName: ENCOUNTER_TABLE.} = ref object of Model
    description*: Option[string] = some("")
    title*: Option[string] = some("")
    diaryentry_id* {.fk: DiaryEntry.}: int64 = MODEL_INIT_ID
    location_id* {.fk: Location.} : Option[int64] = some(MODEL_INIT_ID)
    order_index*: Option[int] = some(-1)
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
proc newModel*(T: typedesc[EncounterParentLocation]): EncounterParentLocation = newEncounterParentLocation()


type EncounterLocation* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL*: The location an encounter happened in]##
    name*: string = ""
    parent_location_id*: Option[EncounterParentLocation] = some(newEncounterParentLocation())
implDefaults(EncounterLocation)
proc newModel*(T: typedesc[EncounterLocation]): EncounterLocation = newEncounterLocation()


type EncounterSession* {.defaults, tableName: SESSION_TABLE.} = ref object of Model
    session_number*: int = -1
    is_main_session*: bool = true
    campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)
implDefaults(EncounterSession)
proc newModel*(T: typedesc[EncounterSession]): EncounterSession = newEncounterSession()


type EncounterDiaryentry* {.defaults, tableName: DIARYENTRY_TABLE.} = ref object of Model
    session_id*: EncounterSession = newEncounterSession()
implDefaults(EncounterDiaryentry)
proc newModel*(T: typedesc[EncounterDiaryentry]): EncounterDiaryentry = newEncounterDiaryentry()


type EncounterRead* {.defaults, tableName: ENCOUNTER_TABLE.} = ref object of Model
    description*: Option[string] = some("")
    title*: Option[string] = some("")
    diaryentry_id*: EncounterDiaryentry = newEncounterDiaryentry()
    location_id*: Option[EncounterLocation] = some(newEncounterLocation())
    order_index*: Option[int] = some(-1)
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
implDefaults(EncounterRead)

proc newModel*(T: typedesc[EncounterRead]): EncounterRead = newEncounterRead()
