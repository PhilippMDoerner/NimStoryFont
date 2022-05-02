import miniz
import zippy
import prologue
import std/[strformat, strutils]

proc responseCompressionMiddleware*(): HandlerAsync =
  ## Compresses the response
  result = proc(ctx: Context) {.async.} =
    await switch(ctx)

    if ctx.request.headers.hasKey("Accept-Encoding"):
      let encodings: seq[string] = ctx.request.getHeaderOrDefault("Accept-Encoding")
      assert(encodings.len() == 1, "The expected buggy behaviour is that the entires tring of Accept-Encoding is packaged as one value")
      let allowCompression = encodings[0].contains("deflate")
      
      if allowCompression:
        ctx.response.headers.add("Content-Encoding", "deflate")
        ctx.response.headers.add("X-org-size", $ctx.response.body.len) # just for me to see the difference
        ctx.response.body = miniz.compress(ctx.response.body)
        ctx.response.headers.add("X-compressed-size", $ctx.response.body.len) # just for me to see the difference


proc responseCompressionMiddleware2*(): HandlerAsync =
  ## Compresses the response
  result = proc(ctx: Context) {.async.} =
    await switch(ctx)

    if ctx.request.headers.hasKey("Accept-Encoding"):
      let encodings: seq[string] = ctx.request.getHeaderOrDefault("Accept-Encoding")
      assert(encodings.len() == 1, "The expected buggy behaviour is that the entires tring of Accept-Encoding is packaged as one value")
      let allowCompression = encodings[0].contains("deflate")
      
      if allowCompression:
        ctx.response.headers.add("Content-Encoding", "deflate")
        ctx.response.headers.add("X-org-size", $ctx.response.body.len) # just for me to see the difference
        ctx.response.body = compress(ctx.response.body, BestCompression, CompressedDataFormat.dfDeflate)
        ctx.response.headers.add("X-compressed-size", $ctx.response.body.len) # just for me to see the difference

#      compress("gzip'ed response body", BestSpeed, dfGzip),