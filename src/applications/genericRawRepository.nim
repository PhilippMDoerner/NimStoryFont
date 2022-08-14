import std/[strformat, strutils, options, typetraits, enumerate, sequtils]
import norm/sqlite

when defined(normDebug):
  import std/logging

type RawType = int | string | float | bool | ref object 

proc rawSelectRows*[T: RawType](connection: DbConn, sqlQuery: string, outputType: typedesc[T], queryParams: varargs[DbValue]): seq[T] =
  when defined(normDebug):
    log(lvlDebug, fmt"'{sqlQuery}' <- {queryParams.repr}")

  when T is ref object:
    result = @[new(T)]
    connection.rawSelect(sqlQuery, result, queryParams)

  else:
    let query = sql(sqlQuery)
    let rows: seq[Row] = connection.getAllRows(query, queryParams)
    let hasRows = rows.len() > 0
    if hasRows:
      let hasSingleColumn = row[0].len() == 1
      if not hasSingleColumn:
        raise newException(ValueError, fmt"Tried parsing sqlQuery into type '{name(T)}'. T was not a ref object and thus expected to require only 1 column of data. However, the query returned '{row.len()}' columns of data! Query: {sqlQuery}")
      else:
        for row in rows:
          let columnVal = row[0]
          result.add(columnVal.to(T))

proc rawSelectRow*[T: RawType](connection: DbConn, sqlQuery: string, outputType: typedesc[T], queryParams: varargs[DbValue]): T =
  when defined(normDebug):
    log(lvlDebug, fmt"'{sqlQuery}' <- {queryParams.repr}")

  when T is ref object:
    result = new(T)
    connection.rawSelect(sqlQuery, result, queryParams)
    
  else:
    let query = sql(sqlQuery)
    let row: Option[Row] = connection.getRow(query, queryParams)

    if row.isNone():
      raise newException(NotFoundError, fmt"Expected to find row for SQL query '{sqlQuery}' <- '{queryParams}', but found nothing!")
    else:
      let rawRow = row.get()
      let hasSingleColumn = rawRow.len() == 1
      
      if hasSingleColumn:
        const typeName: string = name(T)
        raise newException(ValueError, fmt"Tried parsing sqlQuery into type '{typeName}'. T was not a ref object and thus expected to require only 1 column of data. However, the query returned '{rawRow.len()}' columns of data! Query: {sqlQuery}")
      else:
        let columnVal = rawRow[0]
        result = columnVal.to(T)

proc rawExec*(connection: DbConn, sqlQuery: string, queryParams: varargs[DbValue]) {.gcsafe.} =
  when defined(normDebug):
    log(lvlDebug, fmt"'{sqlQuery}' <- {queryParams}")
  
  {.cast(gcsafe).}:
    connection.exec(sql sqlQuery, queryParams)

proc getColumns[T: ref object](t: typedesc[T]): seq[string]{.compileTime.} =
  for fieldName, value in T()[].fieldPairs:
    result.add(fieldName)

proc assertNoNestedObjects[T: ref object](t: typedesc[T]): bool {.compileTime.} =
  for fieldName, value in T()[].fieldPairs:
    let isObject = typeof(value) is (object or ref object)
    let name = name(typeof(value))
    assert(not isObject, fmt"You're trying to insert with a non-Model object with nested fields with Model '{name}'. This is not allowed. Please ensure all fields are in there directly")

proc rawInsert*[T: ref object](connection: DbConn, obj: T, tableName: string) =
  static: discard assertNoNestedObjects(T)

  const columnNames: seq[string] = getColumns(T)
  const columnCount: int = columnNames.len()
  const columnString: string = columnNames.join(",")
  const valueString: string = "?".repeat(columnCount).join(",")

  let sqlQuery = fmt"""
    INSERT INTO {tableName} ({columnString})
    VALUES ({valueString})
  """
  
  var queryParams: array[columnCount, DbValue]
  for index, fieldName, value in enumerate(obj[].fieldPairs):
    queryParams[index] = value.dbValue()

  connection.rawExec(sqlQuery, queryParams)
