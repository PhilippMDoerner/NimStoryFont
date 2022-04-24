import sessionModel
import std/[strformat]
import prologue except Session

proc `$`*(entry: SessionRead | Session): string =
  result.add(if entry.is_main_session: "Main" else: "Side")
  result.add(fmt" Session {entry.session_number}")
