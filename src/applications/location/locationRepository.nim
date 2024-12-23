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
      SELECT id, id 
      FROM wikientries_location baseLoc 
      WHERE baseLoc.parent_location_id IS NULL
      
      UNION ALL
      
      -- recursive select statement
      SELECT cloc.id, locationpath.id_path ||','|| cloc.id 
      FROM wikientries_location cloc
      JOIN locationpath ON cloc.parent_location_id=locationpath.id
    )
    SELECT id, id_path
    FROM locationpath
    WHERE id IN ({locationIdStr})
  """
  
  let rawParentLocationIdRows: seq[Row] = connection.getAllRows(parentLocationIdQuery)

  assert(locationIdsDed.len() == rawParentLocationIdRows.len(), fmt"Failed to fetch an id_path for every id when fetching parent locations! Started with '{locationIdsDed}' ids, got '{rawParentLocationIdRows}' rows back!")

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

proc parseIdString(idStr: string): seq[int64] =
  return idStr
    .split(',')
    .map(idStr => idStr.parseInt().int64)
    .deduplicate()

proc getParentLocations*(connection: DbConn, locationIds: seq[int64]): Table[int64, seq[Location]] =
  let parentLocationIdStrings: Table[int64, Option[string]] = connection.getParentLocationIdStrings(locationIds)
  
  var parentLocationIdSets: Table[int64, HashSet[int64]] = initTable[int64, HashSet[int64]]()
  var totalIdSet: HashSet[int64] = initHashSet[int64]()
  for locationId in parentLocationIdStrings.keys:
    let parentLocationIdString: Option[string] = parentLocationIdStrings[locationId]
    if parentLocationIdString.isNone():
      continue

    var idSet: HashSet[int64] = parentLocationIdString.get().parseIdString().toHashSet()
    
    parentLocationIdSets[locationId] = idSet
    totalIdSet.incl(idSet)

  var allIdsStr: string = ""
  for id in totalIdSet.items:
    allIdsStr.add(fmt"{id},")
  allIdsStr.removeSuffix(",")

  let condition = fmt"id IN ({allIdsStr})"

  var parentLocations: seq[Location] = @[new(Location)]
  connection.select(parentLocations, condition)

  for locationId in locationIds:
    if parentLocationIdSets.hasKey(locationId):
      let parentIds: HashSet[int64] = parentLocationIdSets[locationId]
      let parentLocationsForId: seq[Location] = parentLocations.filter(loc => parentIds.contains(loc.id))
      result[locationId] = parentLocationsForId
    else:
      result[locationId] = @[]

proc find[T](list: seq[T], condition: proc(x: T): bool): Option[T] =
  for item in list:
    if condition(item):
      return some(item)
  return none(T)

proc sortById[T: Model](list: seq[T], ids: seq[int64]): seq[T] =
  result = ids
    .map(id => list.find(item => item.id == id))
    .filter(item => item.isSome())
    .map(item => item.get())
  
  assert(result.len() == ids.len(), fmt"Failed to sort parent locations! Got only '{result.len()}' entries in 'sorted' list but expected it to have '{ids.len()}'")

proc getParentLocations*(connection: DbConn, locationId: int64): seq[Location] =
  let parentLocationIdStr: Option[string] = connection.getParentLocationIdString(locationId)
  let hasParents = parentLocationIdStr.isSome()
  if not hasParents:
    return @[]

  let condition = fmt"id IN ({parentLocationIdStr.get()})"
  let parentLocations = connection.getList(Location, condition)
  
  let parentLocationIds: seq[int64] = parentLocationIdStr.get().parseIdString()
  result = parentLocations.sortById(parentLocationIds)
  

proc getParentLocationReads*(connection: DbConn, locationId: int64): seq[LocationRead] =
  let parentLocationIdStr: Option[string] = connection.getParentLocationIdString(locationId)
  let hasParentLocations = parentLocationIdStr.isSome()
  if not hasParentLocations:
    return @[]

  let condition = fmt"{LocationRead.table()}.id IN ({parentLocationIdStr.get()})"
  let parentLocations = connection.getList(LocationRead, condition)
  
  let parentLocationIds: seq[int64] = parentLocationIdStr.get().parseIdString()
  result = parentLocations.sortById(parentLocationIds)
  

proc getSubLocations*(connection: DbConn, locationId: int64): seq[Location] =
  const condition = fmt"{Location.table()}.parent_location_id = ?"
  result = connection.getList(Location, condition, locationId.dbValue())