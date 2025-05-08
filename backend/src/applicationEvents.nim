import std/[logging, sugar]
import prologue

const LOG_FORMAT = "[$date $time] - $levelname: "

proc addLogger*() =
  when defined(normdebug):
    addHandler(newConsoleLogger(fmtStr = LOG_FORMAT, levelThreshold = lvlDebug))
    logging.setLogFilter(lvlDebug)
  else:
    addHandler(newConsoleLogger(fmtStr = LOG_FORMAT))
    logging.setLogFilter(lvlInfo)

proc getStartUpEvents*(): seq[Event] =
  result.add(initEvent(() => addLogger()))

proc getShutDownEvents*(): seq[Event] =
  result = @[]
