import prologue
import quoteService
import quoteUtils
import quoteSerialization
import std/[strutils, uri]
import ../../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import ../../utils/djangoDateTime/serialization
import norm/model
import jsony
import ../controllerTemplates
import ../genericArticleRepository

type CreateQuoteConnectionRequestBody* = object
  character*: string
  quote*: int64

proc createQuoteConnection*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let body = ctx.request.body.fromJson(CreateQuoteConnectionRequestBody)
    let characterId: int64 = body.character.parseInt().int64
    let quoteId: int64 = body.quote

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        let quote = connection.getEntryById(quoteId, QuoteRead)
        checkQuotePermission(ctx, quote)

        let entry: QuoteConnectionRead = connection.createQuoteConnection(quoteId, characterId)
        let data = connection.serializeQuoteConnectionRead(entry)
        resp jsonyResponse(ctx, data)
