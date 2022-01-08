import norm/[model, pragmas]
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType
import std/options


type Encounter* {.tableName: ENCOUNTER_TABLE.} = ref object of Model
    description*: Option[string]
    title*: Option[string]
    diaryentry_id*: int64
    location_id*: Option[int64]
    order_index*: Option[int]
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime


type EncounterParentLocation* {.tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL*: The parent location of a location, that an encounter happened 
    in]##
    name*: string


type EncounterLocation* {.tableName: LOCATION_TABLE.} = ref object of Model
    ##[HELPER MODEL*: The location an encounter happened in]##
    name*: string
    parent_location_id*: Option[EncounterParentLocation]


type EncounterSession* {.tableName: SESSION_TABLE.} = ref object of Model
    session_number*: int
    is_main_session*: bool


type EncounterDiaryentry* {.tableName: DIARYENTRY_TABLE.} = ref object of Model
    session_id*: EncounterSession


type EncounterRead* {.tableName: ENCOUNTER_TABLE.} = ref object of Model
    description*: Option[string]
    title*: Option[string]
    diaryentry_id*: EncounterDiaryentry
    location_id*: Option[EncounterLocation]
    order_index*: int
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime



proc newEncounterSession(session_number = -1, is_main_session = true): EncounterSession =
    result = EncounterSession(session_number: session_number, is_main_session: is_main_session)


proc newEncounterDiaryEntry(session_id = newEncounterSession()): EncounterDiaryentry = 
    result = EncounterDiaryentry(session_id: session_id)


proc newEncounter(
    description = none(string),
    title = none(string),
    diaryentry_id = -1,
    location_id = none(int64),
    order_index = none(int),
    update_datetime = djangoDateTimeType.now(),
    creation_datetime = djangoDateTimeType.now()
): Encounter =
    result = Encounter(
        description: description,
        title: title,
        diaryentry_id: diaryentry_id,
        location_id: location_id,
        order_index: order_index,
        update_datetime: update_datetime,
        creation_datetime: creation_datetime
    )


proc newEncounterRead(
    description = none(string),
    title = none(string),
    diaryentry_id = newEncounterDiaryEntry(),
    location_id = none(EncounterLocation),
    order_index = -1,
    update_datetime = djangoDateTimeType.now(),
    creation_datetime = djangoDateTimeType.now()
): EncounterRead =
    result = EncounterRead(
        description: description,
        title: title,
        diaryentry_id: diaryentry_id,
        location_id: location_id,
        order_index: order_index,
        update_datetime: update_datetime,
        creation_datetime: creation_datetime
    )


proc newModel*(T: typedesc[EncounterRead]): EncounterRead =
    result = newEncounterRead()


proc newModel*(T: typedesc[Encounter]): Encounter =
    result = newEncounter()


proc newTableModel*(T: typedesc[Encounter]): Encounter =
    result = newEncounter()



