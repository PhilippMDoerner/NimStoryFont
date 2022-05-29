import zippy
import prologue
import std/[strformat, strutils]
import jsony


proc responseCompressionMiddleware*(): HandlerAsync =
  ## Compresses the response
  result = proc(ctx: Context) {.async.} =
    await switch(ctx)

    if ctx.request.headers.hasKey("Accept-Encoding"):
      let encodings: seq[string] = ctx.request.getHeaderOrDefault("Accept-Encoding")
      #Somehow when compiling against debug builds it does not take the encodings as an array of strings
      if "deflate" in encodings or (encodings.len() > 0 and "deflate" in encodings[0]):
        ctx.response.headers.add("Content-Encoding", "deflate")
        ctx.response.headers.add("X-org-size", $ctx.response.body.len) # just for me to see the difference
        ctx.response.body = compress(ctx.response.body, BestCompression, CompressedDataFormat.dfDeflate)
        ctx.response.headers.add("X-compressed-size", $ctx.response.body.len) # just for me to see the difference

