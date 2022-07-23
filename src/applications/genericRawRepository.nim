import std/[db_sqlite, strformat, strutils, sequtils]
import nisane
when defined(normDebug):
  import std/logging

type RawType = ref object | object | int | string | float | bool

proc parseTo[T: RawType](row: Row, rowType: typedesc[T]): T =
    when T is ref object:
        result = new(T)
        row.to(result, nil)
    elif T is object:
        result = init(T)
        row.to(result, nil)
    elif T is int:
        result = row[0].parseInt()
    elif T is string:
        result = row[0]
    elif T is bool:
        result = row[0].parseBool()

proc rawSelectRows*[T: RawType](connection: DbConn, sqlQuery: string, outputType: typedesc[T], queryParams: varargs[string]): seq[T] =
    when defined(normDebug):
        log(lvlDebug, fmt"'{sqlQuery}' <- {queryParams.repr}")

    let query = sql(sqlQuery)
    let rows: seq[Row] = connection.getAllRows(query, queryParams)

    result = rows.mapIt(it.parseTo(T))

proc rawSelectRow*[T: RawType](connection: DbConn, sqlQuery: string, outputType: typedesc[T], queryParams: varargs[string]): T =
    when defined(normDebug):
        log(lvlDebug, fmt"'{sqlQuery}' <- {queryParams.repr}")

    let query = sql(sqlQuery)
    let row: Row = connection.getRow(query, queryParams)

    result = row.parseTo(T)

proc rawExec*(connection: DbConn, sqlQuery: string, queryParams: varargs[string]) =
  when defined(normDebug):
    log(lvlDebug, fmt"'{sqlQuery}' <- {queryParams}")
  
  connection.exec(sql sqlQuery, queryParams)

