import std/logging
import prologue

proc setLoggingLevel() =
    when defined(normdebug):
        addHandler(newConsoleLogger())
        logging.setLogFilter(lvlDebug)


proc getStartUpEvents*(): seq[Event] =
    result.add(initEvent(setLoggingLevel))

proc getShutDownEvents*(): seq[Event] =
    result = @[]