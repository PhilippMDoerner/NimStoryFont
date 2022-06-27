import std/logging
import applicationConstants
import prologue

proc addLogger*() =
    when defined(normdebug):
        addHandler(newConsoleLogger(levelThreshold = lvlDebug))
        logging.setLogFilter(lvlDebug)
    else:
        addHandler(newRollingFileLogger(filename = LOGGER_FILEPATH))
        logging.setLogFilter(lvlWarn)

proc getStartUpEvents*(): seq[Event] =
    result.add(initEvent(addLogger))

proc getShutDownEvents*(): seq[Event] =
    result = @[]