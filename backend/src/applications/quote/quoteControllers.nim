import std/[strutils, options, sugar]
import prologue
import jsony
import ./quoteService
import ./quoteUtils
import ./quoteSerialization
import ../controllerTemplates
import ../genericArticleRepository
import ../allUrlParams
import ../../database
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization

type CreateQuoteConnectionRequestBody = object
  character: int64
  quote: int64

proc createQuoteConnection*(ctx: Context) {.async, gcsafe.} =
  let ctx = JWTContext(ctx)

  let body = ctx.request.body.fromJson(CreateQuoteConnectionRequestBody)
  let characterId: int64 = body.character
  let quoteId: int64 = body.quote

  respondOnError:
    withDbTransaction(connection):
      let quote = connection.getEntryById(quoteId, QuoteRead)
      checkQuotePermission(ctx, quote)

      let entry: QuoteConnectionRead =
        connection.createQuoteConnection(quoteId, characterId)
      let data = connection.serializeQuoteConnectionRead(entry)
      resp jsonyResponse(ctx, data)

proc getRandomQuote*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  let params = ReadByNameParams(
    campaignName: ctx.getPathParams(CAMPAIGN_NAME_PARAM),
    articleName: ctx.getPathParams(ARTICLE_NAME_PARAM),
    userToken: ctx.tokenData,
  )

  respondOnError:
    withDbConn(connection):
      let entry: Option[QuoteRead] = connection.getRandomCharacterQuote(params)

      if entry.isSome():
        checkQuotePermission(ctx, entry.get())

      let data: Option[QuoteSerializable] =
        entry.map(quote => connection.serializeQuoteRead(quote))
      resp jsonyResponse(ctx, data)
