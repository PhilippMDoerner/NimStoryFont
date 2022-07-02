import std/[logging, sugar]
import prologue

proc addLogger*(logFilePath: string) =
    when defined(normdebug):
        addHandler(newConsoleLogger(levelThreshold = lvlDebug))
        addHandler(newRollingFileLogger(filename = logFilePath))
        logging.setLogFilter(lvlDebug)
    else:
        addHandler(newRollingFileLogger(filename = logFilePath))
        logging.setLogFilter(lvlInfo)



proc getStartUpEvents*(logFilePath: string): seq[Event] =
    result.add(initEvent(() => addLogger(logFilePath)))

proc getShutDownEvents*(): seq[Event] =
    result = @[]