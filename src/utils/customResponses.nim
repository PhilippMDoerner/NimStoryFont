import jsony
import prologue
import jwtContext

export jsony

func jsonyResponse*(text: string, code = Http200, headers = initResponseHeaders(),
                   version = HttpVer11): Response {.inline.} =
  ## Content-Type: application/json.
  result = initResponse(version, code, headers, body = $text)
  result.headers["Content-Type"] = "application/json" 

proc jsonyResponse*[T](
  ctx: Context,
  content: T, 
  code = Http200, 
  headers = initResponseHeaders(),
  version = HttpVer11
): Response {.inline.} =
  jsonyResponse(text = jsony.toJson(content), code = code, headers = headers)


proc outdatedUpdateResponse*[T: object | ref object](
  ctx: JWTContext,
  content: T
): Response {.inline.} =
  result = initResponse(HttpVer11, code = Http409, headers = initResponseHeaders(), body = content.toJson())
  result.headers["Content-Type"] = "application/json" 