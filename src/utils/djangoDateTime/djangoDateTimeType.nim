import std/[logging, times, strformat]
import ../../applicationSettings

#Create custom DateTime Datatype `DjangoDateTime`. 
#Necessary as norm assumes the DB stores DateTime data as unix timestamp floats
#Django does not do that, it stores specifically formatted strings
type DjangoDateTime* = distinct DateTime

#Borrowed functionality from actual DateTime that is needed
proc toTime*(x: DjangoDateTime): Time  {.borrow.}
proc isInitialized*(x: DjangoDateTime): bool {.borrow.}
proc fromUnix*(input: int64): DjangoDateTime = times.fromUnix(input).local().DjangoDateTime

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
        log(lvlDebug, fmt"Failed parsing '{input}' to format {PRIMARY_DB_TIME_FORMAT}. Attempting parsing with '{SECONDARY_DB_TIME_FORMAT}'")
        try:
            result = djangoDateTimeType.parse(input, SECONDARY_DB_TIME_FORMAT, utc())
        
        except TimeParseError:
            log(lvlDebug, fmt"Failed parsing '{input}' to format {SECONDARY_DB_TIME_FORMAT}. Attempting parsing with '{OUTPUT_TIME_FORMAT}'")
            
            try:
                result = djangoDateTimeType.parse(input, OUTPUT_TIME_FORMAT, utc())

            except TimeParseError:
                log(lvlDebug, fmt"Failed parsing '{input}' to format {OUTPUT_TIME_FORMAT}. Attempting parsing with '{SESSION_DATE_FORMAT}'")
                result = djangoDateTimeType.parse(input, SESSION_DATE_FORMAT, utc())
