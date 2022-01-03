import jsony
import prologue
import jwtContext

func jsonyResponse*(text: string, code = Http200, headers = initResponseHeaders(),
                   version = HttpVer11): Response {.inline.} =
  ## Content-Type: application/json.
  result = initResponse(version, code, headers, body = $text)
  result.headers["Content-Type"] = "application/json" 

proc jsonyResponse*[T](
  ctx: JWTContext,
  content: T, 
  code = Http200, 
  headers = initResponseHeaders(),
  version = HttpVer11
): Response {.inline.} =
  jsonyResponse(text = content.toJson(), code = code, headers = headers)