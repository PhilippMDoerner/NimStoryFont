import std/[strformat, strutils, sugar, options]
import ../genericArticleRepository
import norm/[sqlite]
import locationModel

proc parseParentIdRow(row: Row): Option[string] =
  let value: DbValue = row[0]
  case value.kind:
  of dvkInt:
    result = some(fmt"{value.i}")
  of dvkString:
    result = some(value.s)
  else:
    result = none(string)
  

proc getParentLocationIdString(connection: DbConn, locationId: int64): Option[string] =
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
    SELECT id_path
    FROM locationpath
    WHERE id = ?;
  """
  
  let rawParentLocationIdRow: Option[Row] = connection.getRow(
    parentLocationIdQuery,
    locationId.dbValue()
  )
  
  result = rawParentLocationIdRow.flatmap(parseParentIdRow)



proc getParentLocations*(connection: DbConn, locationId: int64): seq[Location] =
  let parentLocationIds: Option[string] = connection.getParentLocationIdString(locationId)
  if parentLocationIds.isNone():
    return @[]

  var parentLocations: seq[Location] = @[newModel(Location)]

  let condition = fmt"id IN ({parentLocationIds.get()})"
  connection.select(parentLocations, condition)

  result = parentLocations
