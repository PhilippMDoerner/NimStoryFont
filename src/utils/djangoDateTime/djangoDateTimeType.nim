import std/times
import ../../applicationSettings

#Create custom DateTime Datatype `DjangoDateTime`. 
#Necessary as norm assumes the DB stores DateTime data as unix timestamp floats
#Django does not do that, it stores specifically formatted strings
type DjangoDateTime* = distinct DateTime

#Borrowed functionality from actual DateTime that is needed
proc toTime*(x: DjangoDateTime): Time  {.borrow.}
proc format*(x: DjangoDateTime, loc: DateTimeLocale = DefaultLocale, dateFormat = PRIMARY_DB_TIME_FORMAT): string =
    let trueDt = x.DateTime 
    result = trueDt.format(dateFormat, loc)
proc now*(): DjangoDateTime = DjangoDateTime(times.now())
proc parse*(
    input: string, 
    f: string = PRIMARY_DB_TIME_FORMAT,
    tz: Timezone = local(), 
    loc: DateTimeLocale = DefaultLocale
): DjangoDateTime = 
    result = DjangoDateTime(times.parse(input, f, tz, loc))

proc parseDefault*(input: string): DjangoDateTime =
    try:
        result = djangoDateTimeType.parse(input, PRIMARY_DB_TIME_FORMAT, utc())
    except TimeParseError:
        try:
            result = djangoDateTimeType.parse(input, SECONDARY_DB_TIME_FORMAT, utc())
        except TimeParseError:
            result = djangoDateTimeType.parse(input, OUTPUT_TIME_FORMAT, utc())