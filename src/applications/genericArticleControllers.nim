import prologue
import std/[strutils]
import ../utils/[jwtContext, customResponses, errorResponses]
import controllerTemplates
import genericArticleRepository
import allUrlParams
import norm/model

proc deleteEntryControllerFactory*[T: Model](modelType: typedesc[T]): HandlerAsync =
  result = proc (ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let entryId: int = parseInt(ctx.getPathParams(ID_PARAM))

    respondBadRequestOnDbError():
      deleteEntry(entryId, modelType)
      respDefault(Http204)