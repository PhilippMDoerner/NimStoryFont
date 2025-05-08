import std/[strformat]
import prologue except Session
import ./sessionModel

proc `$`*(entry: SessionRead | Session): string =
  result.add(if entry.is_main_session: "Main" else: "Side")
  result.add(fmt" Session {entry.session_number}")
