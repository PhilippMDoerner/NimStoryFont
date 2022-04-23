import std/[strformat, strutils, sugar, options, sequtils, tables, sets]
import ../genericArticleRepository
import norm/[sqlite, model]
import locationModel

proc parseParentIdRow(value: DbValue): string =
  case value.kind:
  of dvkInt:
    result = value.i.int.intToStr()
  of dvkString:
    result = value.s
  else:
    result = ""

proc getParentLocationIdStrings(connection: DbConn, locationIds: seq[int64]): Table[int64, Option[string]] =
  let locationIdsDed = locationIds.deduplicate()
  let locationIdStr: string = locationIdsDed.map(id => id.int.intToStr).join(",")
  let parentLocationIdQuery: SqlQuery = sql fmt"""
    WITH RECURSIVE locationpath(id, id_path) AS
    (
      -- root select statement
      SELECT id, id FROM wikientries_location baseLoc WHERE baseLoc.parent_location_id IS NULL
      UNION ALL
      -- recursive select statement
      SELECT cloc.id, locationpath.id_path ||','|| cloc.id 
      FROM wikientries_location cloc
      JOIN locationpath ON cloc.parent_location_id=locationpath.id
    )
    SELECT id, id_path
    FROM locationpath
    WHERE id IN ({locationIdStr});
  """
  
  let rawParentLocationIdRows: seq[Row] = connection.getAllRows(parentLocationIdQuery)

  assert(locationIdsDed.len() == rawParentLocationIdRows.len(), "Failed to fetch an id_path for every id when fetching parent locations!")

  for row in rawParentLocationIdRows:
    let rowLocationId: string = $row[0]
    var rowParentLocationIdStr: string = row[1].parseParentIdRow()
    rowParentLocationIdStr.removeSuffix(rowLocationId)
    rowParentLocationIdStr.removeSuffix(",")
    if rowParentLocationIdStr == "":
      result[rowLocationId.parseInt().int64] = none(string)
    else:
      result[rowLocationId.parseInt().int64] = some(rowParentLocationIdStr)

proc getParentLocationIdString(connection: DbConn, locationId: int64): Option[string] =
  let idStrings: Table[int64, Option[string]] = connection.getParentLocationIdStrings(@[locationId])
  if idStrings.len() == 1:
    for key in idStrings.keys:
      result = idStrings[key]

  elif idStrings.len() == 0:
    result = none(string)

  else:
    raise newException(ValueError, fmt"Received 2 sets of parentLocations for the single location id {locationId}")


proc getParentLocations*(connection: DbConn, locationIds: seq[int64]): Table[int64, seq[Location]] =
  let parentLocationIdStrings: Table[int64, Option[string]] = connection.getParentLocationIdStrings(locationIds)
  
  var parentLocationIdSets: Table[int64, HashSet[int64]] = initTable[int64, HashSet[int64]]()
  var totalIdSet: HashSet[int64] = initHashSet[int64]()
  for locationId in parentLocationIdStrings.keys:
    let parentLocationIdString: Option[string] = parentLocationIdStrings[locationId]
    if parentLocationIdString.isNone():
      continue

    var idSet: HashSet[int64] = parentLocationIdString
      .get()
      .split(',')
      .map(idStr => idStr.parseInt().int64)
      .toHashSet()
    
    parentLocationIdSets[locationId] = idSet
    totalIdSet.incl(idSet)

  var allIdsStr: string = ""
  for id in totalIdSet.items:
    allIdsStr.add(fmt"{id},")
  allIdsStr.removeSuffix(",")

  let condition = fmt"id IN ({allIdsStr})"

  var parentLocations: seq[Location] = @[newModel(Location)]
  connection.select(parentLocations, condition)

  for locationId in locationIds:
    let parentIds: HashSet[int64] = parentLocationIdSets[locationId]
    let parentLocationsForId: seq[Location] = parentLocations.filter(loc => parentIds.contains(loc.id))
    result[locationId] = parentLocationsForId



proc getParentLocations*(connection: DbConn, locationId: int64): seq[Location] =
  let parentLocationIds: Option[string] = connection.getParentLocationIdString(locationId)
  if parentLocationIds.isNone():
    return @[]

  var parentLocations: seq[Location] = @[newModel(Location)]

  let condition = fmt"id IN ({parentLocationIds.get()})"
  connection.select(parentLocations, condition)

  result = parentLocations

proc getSubLocations*(connection: DbConn, locationId: int64): seq[Location] =
  var sublocations: seq[Location] = @[newModel(Location)]

  const condition = fmt"{Location.table()}.parent_location_id = ?"
  connection.select(sublocations, condition, locationId)

  result = sublocations