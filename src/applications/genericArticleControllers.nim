import prologue
import std/[strutils]
import ../utils/[jwtContext, customResponses, errorResponses]
import controllerTemplates
import genericArticleService
import norm/model

type SerializationByIdProc*[T] = proc(entryId: int64): T {.gcsafe.}
type SerializationByNameProc*[T] = proc(campaignName: string, entryName: string): T {.gcsafe.}

proc createEntryDeletionHandler*[T: Model](modelType: typedesc[T], idPathParamName: string): HandlerAsync =
  result = proc (ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let entryId: int = parseInt(ctx.getPathParams(idPathParamName))

    respondBadRequestOnDbError():
      deleteArticle(entryId, modelType)
      respDefault(Http204)

proc createEntryCreationHandler*[T: Model, M: object | ref object](
  modelType: typedesc[T], 
  getSerializedArticleData: SerializationByIdProc[M]
): HandlerAsync =
  result = proc (ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let jsonData: string = ctx.request.body()
    
    respondBadRequestOnDbError():
        let newEntry = createArticle(jsonData, modelType)
        let serializedNewEntry = getSerializedArticleData(newEntry.id)
        resp jsonyResponse(ctx, serializedNewEntry)

#TODO: Make it so that the creation datetime of an entry can not be changed through this controller, it also shouldn't be necessary
proc createEntryUpdateHandler*[T: Model, M: object | ref object](
  modelType: typedesc[T], 
  idPathParamName: string, 
  getSerializedArticleData: SerializationByIdProc[M]
): HandlerAsync =
  result = proc(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let entryId: int = parseInt(ctx.getPathParams(idPathParamName))
    let jsonData: string = ctx.request.body()

    respondBadRequestOnDbError():
      let updatedEntry = updateArticle(entryId, jsonData, modelType)
      let serializedUpdatedEntry = getSerializedArticleData(updatedEntry.id)
      resp jsonyResponse(ctx, serializedUpdatedEntry)

proc createEntryReadByNameHandler*[T: Model, M: object | ref object](
  modelType: typedesc[T], 
  campaignNameParamName: string,
  entryNameParamName: string, 
  getSerializedArticleData: SerializationByNameProc[M]
): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let entryName: string = ctx.getPathParams(entryNameParamName)
    let campaignName: string = ctx.getPathParams(campaignNameParamName)

    respondBadRequestOnDbError():
      let serializedEntry = getSerializedArticleData(campaignName, entryName)
      resp jsonyResponse(ctx, serializedEntry)