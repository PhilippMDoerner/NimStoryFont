import zippy
import prologue
import std/[strutils]

proc responseCompressionMiddleware*(): HandlerAsync =
  ## Compresses the response
  result = proc(ctx: Context) {.async.} =
    await switch(ctx)

    if ctx.request.headers.hasKey("Accept-Encoding"):
      let encodings: seq[string] = ctx.request.getHeaderOrDefault("Accept-Encoding")
      #Somehow when compiling against debug builds it does not take the encodings as an array of strings
      if "deflate" in encodings or (encodings.len() > 0 and "deflate" in encodings[0]):
        ctx.response.headers.add("Content-Encoding", "deflate")
        ctx.response.body = compress(ctx.response.body, BestCompression, CompressedDataFormat.dfDeflate)

