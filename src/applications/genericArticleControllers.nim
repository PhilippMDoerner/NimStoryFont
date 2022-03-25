import prologue
import std/[strutils]
import ../utils/[jwtContext, customResponses, errorResponses]
import controllerTemplates
import genericArticleService
import ../utils/djangoDateTime/[normConversion, serialization]
import norm/[model]

export serialization
export normConversion



proc createEntryDeletionHandler*[T: Model](modelType: typedesc[T], idPathParamName: string): HandlerAsync =
  result = proc (ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let entryId: int64 = parseInt(ctx.getPathParams(idPathParamName)).int64

    respondBadRequestOnDbError():
      deleteArticle(entryId, modelType)
      respDefault(Http204)



proc createEntryCreationHandler*[T: Model, M: object | ref object](
  modelType: typedesc[T], 
  getSerializedArticleData: SerializationProc[T, M]
): HandlerAsync =
  result = proc (ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let jsonData: string = ctx.request.body()
    
    respondBadRequestOnDbError():
        let newEntry = createArticle(jsonData, modelType, getSerializedArticleData)
        resp jsonyResponse(ctx, newEntry)


#TODO: Make it so that the creation datetime of an entry can not be changed through this controller, it also shouldn't be necessary
proc createEntryUpdateHandler*[T: Model, M: object | ref object](
  modelType: typedesc[T], 
  idPathParamName: string, 
  getSerializedArticleData: SerializationProc[T, M]
): HandlerAsync =
  result = proc(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let entryId: int64 = parseInt(ctx.getPathParams(idPathParamName))
    let jsonData: string = ctx.request.body()

    respondBadRequestOnDbError():
      let updatedEntry = updateArticle(entryId, jsonData, modelType, getSerializedArticleData)
      resp jsonyResponse(ctx, updatedEntry)



proc createEntryReadByIdHandler*[T: Model, M: object | ref object](
  modelType: typedesc[T], 
  idPathParamName: string,
  getSerializedArticleData: SerializationByIdProc[M]
): HandlerAsync = 
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let entryId: int64 = parseInt(ctx.getPathParams(idPathParamName))

    respondBadRequestOnDbError():
      let serializedEntry = readArticle(entryId, getSerializedArticleData)
      resp jsonyResponse(ctx, serializedEntry)
