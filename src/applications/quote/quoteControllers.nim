import prologue
import quoteService
import quoteUtils
import quoteSerialization
import std/[strutils, options, uri, sugar]
import ../../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import ../../utils/djangoDateTime/serialization
import norm/model
import jsony
import ../controllerTemplates
import ../genericArticleRepository
import ../allUrlParams

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


proc getRandomQuote*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  let params = ReadByNameParams(
    campaignName: ctx.getPathParams(CAMPAIGN_NAME_PARAM), 
    articleName: ctx.getPathParams(ARTICLE_NAME_PARAM),
    userToken: ctx.tokenData
  )

  respondBadRequestOnDbError():
    withDbConn(connection):
      let entry: Option[QuoteRead] = connection.getRandomCharacterQuote(params)
      
      if entry.isSome():
        checkQuotePermission(ctx, entry.get())

      let data: Option[QuoteSerializable] = entry.map(quote => connection.serializeQuoteRead(quote))
      resp jsonyResponse(ctx, data)