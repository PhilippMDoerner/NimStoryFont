import prologue
import std/[strutils, sequtils, sugar]
import ../utils/[jwtContext, customResponses, errorResponses]
import tinypool
import controllerTemplates
import genericArticleService
import genericArticleRepository
import ../utils/djangoDateTime/[normConversion, serialization]
import norm/[model]
import jsony

export jsony
export serialization
export normConversion

type DatabaseActionProc[M: object | ref object, Q: object] = proc(queryParams: Q): M {.gcsafe.}
type DatabaseActionSeqProc[M: object | ref object, Q: object] = proc(queryParams: Q): seq[M] {.gcsafe.}
type DatabaseActionNoReturnProc[Q: object] = proc(queryParams: Q) {.gcsafe.}

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



proc createEntryReadByIdHandler*[M: object | ref object](
  idPathParamName: string,
  getSerializedArticleData: SerializationByIdProc[M]
): HandlerAsync = 
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let entryId: int64 = parseInt(ctx.getPathParams(idPathParamName))

    respondBadRequestOnDbError():
      let serializedEntry = readArticle(entryId, getSerializedArticleData)
      resp jsonyResponse(ctx, serializedEntry)



proc createCampaignOverviewHandler*[M: object | ref object](
  campaignNameParamName: string,
  getOverviewSerializedArticlesData: OverviewSerializationProc[M]
): HandlerAsync = 
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let campaignName: string = ctx.getPathParams(campaignNameParamName)

    respondBadRequestOnDbError():
      let overviewSerializedEntries = readArticleOverviews(campaignName, getOverviewSerializedArticlesData)
      resp jsonyResponse(ctx, overviewSerializedEntries)



proc createReadListHandler*[T: Model, M: object | ref object](
  getSerializedArticlesData: SerializationProc[T, M]
): HandlerAsync = 
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    respondBadRequestOnDbError():
      withDbConn(connection):
        let entryList: seq[T] = connection.getList(T)
        let serializedEntries: seq[M] = entryList.map(entry => connection.getSerializedArticlesData(entry))
        resp jsonyResponse(ctx, serializedEntries)




### NEW PARADIGM BELOW THIS POINT ###


proc extractQueryParam[T](ctx: Context, fieldName: static string, fieldValue: var T) =
  ## Extracts all releavant URL parameters and the HTTP body from the request and into a defined object
  ## TODO: Figure out how to check if a url param exists at compiletime
  when fieldName == "body":
    fieldValue = ctx.request.body()
  elif fieldValue is Option:
    fieldValue = extractQueryParam(ctx, fieldName, fieldValue)
  elif fieldValue is int:
    fieldValue = parseInt(ctx.getPathParms(fieldName))
  elif fieldValue is string:
    fieldValue = ctx.getPathParams(fieldName)
  elif fieldValue is bool:
    fieldValue = parseBool(ctx.getPathParams(fieldName))
  else:
    assert(false, fmt"Tried extracting query parameter {fieldName} which was neither an int, string or bool or an Option of those types") 

proc extractQueryParams[Q: object](ctx: Context, dataContainerType: typedesc[Q]): Q =
  mixin init

  result = init(Q)

  for fieldName, fieldValue in result.fieldPairs:
    extractQueryParam(ctx, fieldName, fieldValue)

proc createSimpleHandler*[M: object | ref object, Q: object](paramsContainerType: typedesc[Q], serviceProc: DatabaseActionProc[M, Q]): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let queryParams: Q = ctx.extractQueryParams(Q)

    respondBadRequestOnDbError():
      let data = serviceProc(queryParams)
      resp jsonyResponse(ctx, data)


proc createSimpleHandler*[M: object | ref object, Q: object](paramsContainerType: typedesc[Q], serviceProc: DatabaseActionSeqProc[M, Q]): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let queryParams: Q = ctx.extractQueryParams(Q)

    respondBadRequestOnDbError():
      let data = serviceProc(queryParams)
      resp jsonyResponse(ctx, data)

proc createSimpleDeletionHandler*[Q: object](paramsContainerType: typedesc[Q], serviceProc: DatabaseActionNoReturnProc[Q]): HandlerAsync =
  result = proc (ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let queryParams: Q = ctx.extractQueryParams(Q)

    respondBadRequestOnDbError():
      serviceProc(queryParams)
      respDefault(Http204)
