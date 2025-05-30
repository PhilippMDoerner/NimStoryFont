import std/[times, logging]
import lowdb/sqlite
import ./djangoDateTimeType
import ../../applicationSettings
##[ Add support for custom datatype ``DjangoDateTime`` to norm (stolen form norm dbtypes.nim)
Funcs to convert between Nim types and SQLite types and between Nim values and ``lowdb.sqlite.DbValue``.

To add support for ``YourType``, define three funcs:
- ``dbType(T: typedesc[YourType]) -> string`` that returns SQL type for given ``YourType``
- ``dbValue(YourType) -> DbValue`` that converts instances of ``YourType`` to ``lowdb.sqlite.DbValue``
- ``to(DbValue, T: typedesc[YourType]) -> T`` that converts ``lowdb.sqlite.DbValue`` instances to ``YourType``.
]##

func dbType*(T: typedesc[DjangoDateTime]): string =
  "DATETIME"
proc dbValue*(val: DjangoDateTime): DbValue =
  let storableValue =
    if val.isInitialized():
      val
    else:
      warn("Attempted to store uninitialized DjangoDateTime!!! in database")
      djangoDateTimeType.now()

  return dbValue(storableValue.format())

proc to*(dbVal: DbValue, T: typedesc[DjangoDateTime]): T =
  let dateTimeStr: string = dbVal.s
  try:
    result = djangoDateTimeType.parse(dateTimeStr, PRIMARY_DB_TIME_FORMAT, utc())
  except TimeParseError:
    try:
      result = djangoDateTimeType.parse(dateTimeStr, SECONDARY_DB_TIME_FORMAT, utc())
    except TimeParseError:
      result = djangoDateTimeType.parse(dateTimeStr, SESSION_DATE_FORMAT, utc())
