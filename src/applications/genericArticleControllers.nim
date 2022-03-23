import prologue
import std/[strutils]
import ../utils/[jwtContext, customResponses, errorResponses]
import controllerTemplates
import genericArticleRepository
import norm/model

type SerializationProc*[T] = proc(entryId: int64): T {.gcsafe.}

proc createEntryDeletionHandler*[T: Model](modelType: typedesc[T], idPathParamName: string): HandlerAsync =
  result = proc (ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let entryId: int = parseInt(ctx.getPathParams(idPathParamName))

    respondBadRequestOnDbError():
      deleteEntry(entryId, modelType)
      respDefault(Http204)

proc createEntryCreationHandler*[T: Model, M: object | ref object](modelType: typedesc[T], getSerializedArticleData: SerializationProc[M]): HandlerAsync =
  result = proc (ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let jsonData: string = ctx.request.body()
    
    respondBadRequestOnDbError():
        let newEntry = createArticleEntry(jsonData, modelType)
        let serializedNewEntry = getSerializedArticleData(newEntry.id)
        resp jsonyResponse(ctx, serializedNewEntry)

#TODO: Make it so that the creation datetime of an entry can not be changed through this controller, it also shouldn't be necessary
proc createEntryUpdateHandler*[T: Model, M: object | ref object](modelType: typedesc[T], idPathParamName: string, getSerializedArticleData: SerializationProc[M]): HandlerAsync =
  result = proc(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let entryId: int = parseInt(ctx.getPathParams(idPathParamName))
    let jsonData: string = ctx.request.body()

    respondBadRequestOnDbError():
      let updatedEntry = updateArticleEntry(entryId, jsonData, modelType)
      let serializedUpdatedEntry = getSerializedArticleData(updatedEntry.id)
      resp jsonyResponse(ctx, serializedUpdatedEntry)