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
  location_id* {.fk: Location.}: Option[int64] = some(MODEL_INIT_ID)
  order_index*: Option[int] = some(-1)
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()

implDefaults(Encounter, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type EncounterParentLocation* {.defaults, readOnly, tableName: LOCATION_TABLE.} = ref object of Model
  ##[HELPER MODEL*: The parent location of a location, that an encounter happened 
    in]##
  name*: string = ""

implDefaults(
  EncounterParentLocation, {DefaultFlag.defExported, DefaultFlag.defTypeConstr}
)

type EncounterLocation* {.defaults, readOnly, tableName: LOCATION_TABLE.} = ref object of Model
  ##[HELPER MODEL*: The location an encounter happened in]##
  name*: string = ""
  parent_location_id*: Option[EncounterParentLocation] =
    some(new(EncounterParentLocation))

implDefaults(EncounterLocation, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type EncounterSession* {.defaults, readOnly, tableName: SESSION_TABLE.} = ref object of Model
  session_number*: int = -1
  is_main_session*: bool = true
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)

implDefaults(EncounterSession, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type DiaryEntryAuthor* {.defaults, readOnly, tableName: USER_TABLE.} = ref object of Model
  username*: string = ""

implDefaults(DiaryEntryAuthor, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type EncounterDiaryentry* {.defaults, readOnly, tableName: DIARYENTRY_TABLE.} = ref object of Model
  session_id*: EncounterSession = new(EncounterSession)
  author_id*: DiaryEntryAuthor = new(DiaryEntryAuthor)

implDefaults(EncounterDiaryentry, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type EncounterRead* {.defaults, readOnly, tableName: ENCOUNTER_TABLE.} = ref object of Model
  description*: Option[string] = some("")
  title*: Option[string] = some("")
  diaryentry_id*: EncounterDiaryentry = new(EncounterDiaryentry)
  location_id*: Option[EncounterLocation] = some(new(EncounterLocation))
  order_index*: Option[int] = some(-1)
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()

implDefaults(EncounterRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
