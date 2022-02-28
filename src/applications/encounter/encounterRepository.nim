import encounterModel
import std/[options, strformat, algorithm]
import norm/sqlite
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType]
import ../../utils/databaseUtils


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


proc getNextOrderIndex*(connection: DbConn, encounter: Encounter): int =
    let nextEncounter: Option[Encounter] = connection.getNextEncounter(encounter)
    let isLastEncounter = nextEncounter.isNone()
    if isLastEncounter:
        result = encounter.order_index.get() + ORDER_INDEX_INCREMENT
    else:
        result = nextEncounter.get().order_index.get()


proc getPriorOrderIndex*(connection: DbConn, encounter: Encounter): int =
    let priorEncounter: Option[Encounter] = connection.getPriorEncounter(encounter)
    let isFistEncounter = priorEncounter.isNone()
    if isFistEncounter:
        result = 0
    else:
        result = priorEncounter.get().order_index.get()


proc incrementOrderIndicesOfFollowingEncounters*(connection: DbConn, diaryentryId: int64, orderIndex: int) =
    var followingEncounters: seq[Encounter] = getEncountersAtAndAfterOrderIndex(
        connection, 
        diaryentryId, 
        orderIndex
    )

    for followingEncounter in followingEncounters:
        var encounter: Encounter = deepCopy(followingEncounter)
        let newOrderIndex: int = connection.getNextOrderIndex(encounter)
        encounter.order_index = some(newOrderIndex) # TODO: make order_index a "NOT NULL" field, that shouldn't be an optional
        connection.update(encounter)


proc updateEncounterOrderAfterForwardsInsert*(connection: DbConn, affectedEncounters: var seq[Encounter], cutEncounter: var Encounter) =
    affectedEncounters.reverse() # So that you move the last one "backwards" first 
    for encounter in affectedEncounters.mitems:
        let isCutEncounter = encounter.id == cutEncounter.id
        if not isCutEncounter:
            encounter.order_index = some(connection.getPriorOrderIndex(encounter))

    cutEncounter.order_index = some(-1)
    connection.update(cutEncounter)

    for encounter in affectedEncounters.mitems:
        let isCutEncounter = encounter.id == cutEncounter.id
        if not isCutEncounter:
            connection.update(encounter)


proc updateEncounterOrderAfterBackwardsInsert*(connection: DbConn, affectedEncounters: var seq[Encounter], cutEncounter: var Encounter) =
    for encounter in affectedEncounters.mitems:
        let isCutEncounter = encounter.id == cutEncounter.id
        if not isCutEncounter:
            encounter.order_index = some(connection.getNextOrderIndex(encounter))

    cutEncounter.order_index = some(-1)
    connection.update(cutEncounter)

    for encounter in affectedEncounters.mitems:
        let isCutEncounter = encounter.id == cutEncounter.id
        if not isCutEncounter:
            connection.update(encounter)