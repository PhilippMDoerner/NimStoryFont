import prologue
import std/[strutils]
import ../utils/[jwtContext, customResponses, errorResponses]
import controllerTemplates
import genericArticleRepository
import allUrlParams
import norm/model

proc createEntryDeletionHandler*[T: Model](modelType: typedesc[T]): HandlerAsync =
  result = proc (ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let entryId: int = parseInt(ctx.getPathParams(ID_PARAM))

    respondBadRequestOnDbError():
      deleteEntry(entryId, modelType)
      respDefault(Http204)

proc createEntryCreationHandler*[T: Model, M: object | ref object](modelType: typedesc[T], getSerializedArticleData: proc(entryId: int64): M {.gcsafe.}): HandlerAsync =
  result = proc (ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let jsonData: string = ctx.request.body()
    
    respondBadRequestOnDbError():
        let newEntry = createArticleEntry(jsonData, modelType)
        let serializedNewEntry = getSerializedArticleData(newEntry.id)
        resp jsonyResponse(ctx, serializedNewEntry)
