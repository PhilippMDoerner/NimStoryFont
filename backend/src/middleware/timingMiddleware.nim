import prologue
import std/[strutils, times]

proc timingMiddleware*(): HandlerAsync =
  ## time the response
  result = proc(ctx: Context) {.async.} =
    let startTime = now()
    await switch(ctx)
    let endTime = now()

    let callDuration: Duration = endTime - startTime
    ctx.response.headers.add("Duration-Milliseconds", $callDuration.inMilliseconds())
