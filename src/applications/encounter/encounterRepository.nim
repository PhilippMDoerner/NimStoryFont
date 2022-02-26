import encounterModel
import std/[options, strformat]
import norm/sqlite
import ../../applicationSettings
import ../../applicationConstants


proc getEncountersAtAndAfterOrderIndex*(connection: DbConn, diaryentryId: int64, orderIndex: int): seq[Encounter] =
    var followingEncounters: seq[Encounter] = @[newModel(Encounter)]    
    const sqlCondition = fmt "{ENCOUNTER_TABLE}.diaryentry_id = ? AND {ENCOUNTER_TABLE}.order_index >= ?"
    connection.select(followingEncounters, sqlCondition, diaryentryId, orderIndex)
    result = followingEncounters


proc getEncountersBetweenOrderIndices*(connection: DbConn, diaryentryId: int64, orderIndex1: int, orderIndex2: int): seq[Encounter] =
    let rangeStartOrderIndex = min(orderIndex1, orderIndex2)
    let rangeEndOrderIndex = max(orderIndex1, orderIndex2)

    var affectedEncounters: seq[Encounter] = @[newModel(Encounter)]
    let condition = fmt """
        {ENCOUNTER_TABLE}.diaryentry_id = ? 
        AND {ENCOUNTER_TABLE}.order_index >= ? 
        AND {ENCOUNTER_TABLE}.order_index <= ? 
        ORDER BY {ENCOUNTER_TABLE}.order_index ASC
    """

    connection.select(affectedEncounters, condition, diaryentry_id, rangeStartOrderIndex, rangeEndOrderIndex)

    result = affectedEncounters


proc getNextEncounter*(connection: DbConn, encounter: Encounter): Option[Encounter] =
    const condition = """
        WHERE order_index > ? AND diaryentry_id = ?
        ORDER BY order_index ASC
        LIMIT 1
    """

    var encounter = newModel(Encounter)
    connection.select(encounter, condition, encounter.order_index, encounter.diaryentry_id)
    
    if encounter.id == MODEL_INIT_ID:
        result = none(Encounter)
    else:
        result = some(encounter)


proc getPriorEncounter*(connection: DbConn, encounter: Encounter): Option[Encounter] =
    const condition = """
        WHERE order_index < ? AND diaryentry_id = ?
        ORDER BY order_index DESC
        LIMIT 1
    """

    var encounter = newModel(Encounter)
    connection.select(encounter, condition, encounter.order_index, encounter.diaryentry_id)
    
    if encounter.id == MODEL_INIT_ID:
        result = none(Encounter)
    else:
        result = some(encounter)
