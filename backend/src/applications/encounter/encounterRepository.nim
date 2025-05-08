import std/[options, strformat, algorithm, sequtils]
import norm/sqlite
import ./encounterModel
import ../genericArticleRepository
import ../../applicationSettings
import ../../utils/djangoDateTime/[normConversion]

proc getEncountersAtAndAfterOrderIndex*(
    connection: DbConn, diaryentryId: int64, orderIndex: int
): seq[Encounter] =
  const sqlCondition =
    fmt "{ENCOUNTER_TABLE}.diaryentry_id = ? AND {ENCOUNTER_TABLE}.order_index >= ?"
  result = connection.getList(
    Encounter, sqlCondition, diaryentryId.dbValue(), orderIndex.dbValue()
  )

proc getEncountersBetweenOrderIndices*(
    connection: DbConn, diaryentryId: int64, orderIndex1: int, orderIndex2: int
): seq[Encounter] =
  let rangeStartOrderIndex = min(orderIndex1, orderIndex2) - 2
  let rangeEndOrderIndex = max(orderIndex1, orderIndex2) + 2

  let condition = fmt """
        {ENCOUNTER_TABLE}.diaryentry_id = ? 
        AND {ENCOUNTER_TABLE}.order_index >= ? 
        AND {ENCOUNTER_TABLE}.order_index <= ? 
        ORDER BY {ENCOUNTER_TABLE}.order_index ASC
    """

  result = connection.getList(
    Encounter,
    condition,
    diaryentryId.dbValue(),
    rangeStartOrderIndex.dbValue(),
    rangeEndOrderIndex.dbValue(),
  )

proc getNextEncounter*(connection: DbConn, encounter: Encounter): Option[Encounter] =
  const condition =
    """
        order_index > ? AND diaryentry_id = ? 
        ORDER BY order_index ASC
    """

  var nextEncounter = new(Encounter)
  try:
    connection.select(
      nextEncounter, condition, encounter.order_index, encounter.diaryentry_id
    )
    result = some(nextEncounter)
  except NotFoundError:
    result = none(Encounter)

proc getPriorEncounter*(connection: DbConn, encounter: Encounter): Option[Encounter] =
  const condition =
    """
        order_index < ? AND diaryentry_id = ?
        ORDER BY order_index DESC
    """

  var priorEncounter = new(Encounter)
  try:
    connection.select(
      priorEncounter, condition, encounter.order_index, encounter.diaryentry_id
    )
    result = some(priorEncounter)
  except NotFoundError:
    result = none(Encounter)

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

proc incrementOrderIndicesOfFollowingEncounters*(
    connection: DbConn, diaryentryId: int64, orderIndex: int
) =
  var followingEncounters: seq[Encounter] =
    getEncountersAtAndAfterOrderIndex(connection, diaryentryId, orderIndex)
  followingEncounters.reverse()

  for encounter in followingEncounters.items:
    let newOrderIndex: int = connection.getNextOrderIndex(encounter)
    encounter.order_index = some(newOrderIndex)
      # TODO: make order_index a "NOT NULL" field, that shouldn't be an optional

  for encounter in followingEncounters.mItems:
    connection.update(encounter)

proc updateEncounterOrderAfterForwardsInsert*(
    connection: DbConn,
    affectedEncounters: var seq[Encounter],
    cutEncounter: var Encounter,
) =
  echo "Before ", affectedEncounters.mapIt((it.title, it.order_index.get()))
  for encounter in affectedEncounters.mitems:
    let isCutEncounter = encounter.id == cutEncounter.id
    if not isCutEncounter:
      encounter.order_index = some(connection.getPriorOrderIndex(encounter))
  echo "After ", affectedEncounters.mapIt((it.title, it.order_index.get()))

  cutEncounter.order_index = some(-1)
  connection.update(cutEncounter)

  for encounter in affectedEncounters.mitems:
    let isCutEncounter = encounter.id == cutEncounter.id
    if not isCutEncounter:
      connection.update(encounter)

proc updateEncounterOrderAfterBackwardsInsert*(
    connection: DbConn,
    affectedEncounters: var seq[Encounter],
    cutEncounter: var Encounter,
) =
  affectedEncounters.reverse() # So that you move the last one "backwards" first 

  echo "Before ", affectedEncounters.mapIt((it.title, it.order_index.get()))
  for encounter in affectedEncounters.mitems:
    let isCutEncounter = encounter.id == cutEncounter.id
    if not isCutEncounter:
      encounter.order_index = some(connection.getNextOrderIndex(encounter))
  echo "After ", affectedEncounters.mapIt((it.title, it.order_index.get()))

  cutEncounter.order_index = some(-1)
  connection.update(cutEncounter)

  for encounter in affectedEncounters.mitems:
    let isCutEncounter = encounter.id == cutEncounter.id
    if not isCutEncounter:
      connection.update(encounter)

proc getCampaignEncounters*(
    connection: DbConn, campaignName: string
): seq[EncounterRead] =
  const condition: string = """diaryentry_id_session_id_campaign_id.name LIKE ?"""
  result = connection.getList(EncounterRead, condition, campaignName.dbValue())

proc getEncountersOfDiaryentry*(
    connection: DbConn, diaryentryId: int64
): seq[EncounterRead] =
  const condition: string = """diaryentry_id = ? ORDER BY order_index ASC"""
  result = connection.getList(EncounterRead, condition, diaryentryId.dbValue())
