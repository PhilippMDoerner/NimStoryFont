import std/[logging, sugar]
import prologue

const LOG_FORMAT = "[$date $time] - $levelname: "

proc addLogger*(logFilePath: string) =
    when defined(normdebug):
        addHandler(newConsoleLogger(fmtStr = LOG_FORMAT, levelThreshold = lvlDebug))
        addHandler(newRollingFileLogger(fmtStr = LOG_FORMAT, filename = logFilePath))
        logging.setLogFilter(lvlDebug)
    else:
        addHandler(newRollingFileLogger(fmtStr = LOG_FORMAT, filename = logFilePath))
        logging.setLogFilter(lvlInfo)



proc getStartUpEvents*(logFilePath: string): seq[Event] =
    result.add(initEvent(() => addLogger(logFilePath)))

proc getShutDownEvents*(): seq[Event] =
    result = @[]