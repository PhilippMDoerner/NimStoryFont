import prologue
import std/[strutils, sequtils, sugar]
import ../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import tinypool
import controllerTemplates
import genericArticleService
import genericArticleRepository
import ../utils/djangoDateTime/[normConversion, serialization]
import norm/[model]
import jsony
import allUrlParams

export jsony
export serialization
export normConversion
export genericArticleService

type DatabaseActionProc[M: object | ref object, Q: object] = proc(queryParams: Q): M {.gcsafe.}
type DatabaseActionSeqProc[M: object | ref object, Q: object] = proc(queryParams: Q): seq[M] {.gcsafe.}
type DatabaseActionNoReturnProc[Q: object] = proc(queryParams: Q) {.gcsafe.}


### NEW PARADIGM BELOW THIS POINT ###


proc extractQueryParam[T](ctx: JWTContext, fieldName: static string, fieldValue: var T) =
  ## Extracts all releavant URL parameters and the HTTP body from the request and into a defined object
  ## TODO: Figure out how to check if a url param exists at compiletime
  when fieldName == "body":
    fieldValue = ctx.request.body()
  elif fieldValue is TokenData:
    fieldValue = ctx.tokenData
  elif fieldValue is Option:
    fieldValue = extractQueryParam(ctx, fieldName, fieldValue)
  elif fieldValue is int or fieldValue is int64:
    fieldValue = parseInt(ctx.getPathParams(fieldName))
  elif fieldValue is string:
    fieldValue = ctx.getPathParams(fieldName)
  elif fieldValue is bool:
    fieldValue = parseBool(ctx.getPathParams(fieldName))
  else:
    assert(false, fmt"Tried extracting query parameter {fieldName} which was neither an int, string or bool or an Option of those types") 

proc extractQueryParams[Q: object](ctx: JWTContext, dataContainerType: typedesc[Q]): Q =
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


### NEW PARADIGM 2.0 BELOW THIS POINT ###

type CreateProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS, newEntry: var ENTRY): ENTRY
type ReadProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS): ENTRY
type ReadListProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS): seq[ENTRY]
type UpdateProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS, updateEntry: var ENTRY): ENTRY
type DeleteProc*[ENTRY: Model] = proc(connection: DbConn, deleteEntry: var ENTRY)

type SerializeProc*[ENTRY: Model, SERIALIZATION: object | ref object] = proc(connection: DbConn, entry: ENTRY): SERIALIZATION
type CheckPermissionProc*[ENTRY: Model] = proc(ctx: JWTContext, entry: ENTRY)
type CheckListPermissionProc*[ENTRY: Model] = proc(ctx: JWTContext, entries: seq[ENTRY])

proc createReadHandler*[P: object, E: Model, S: object | ref object](
  readEntry: ReadProc[P, E],
  checkPermission: CheckPermissionProc[E],
  serialize: SerializeProc[E, S],
): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let params: P = ctx.extractQueryParams(P)

    respondBadRequestOnDbError():
      withDbConn(connection):
        let entry: E = connection.readEntry(params)
        
        checkPermission(ctx, entry)

        let data: S = connection.serialize(entry)
        resp jsonyResponse(ctx, data)

proc createReadByIdHandler*[P: object, E: Model, S: object | ref object](serialize: SerializeProc[E, S]): HandlerAsync =
  result = createReadHandler[P, E, S](readArticleById, checkReadPermission, serialize)

proc createReadByNameHandler*[P: object, E: Model, S: object | ref object](serialize: SerializeProc[E, S]): HandlerAsync =
  result = createReadHandler[P, E, S](readArticleByName, checkReadPermission, serialize)

proc createUpdateHandler*[P: object, E: Model, S: object | ref object](
  readProc: ReadProc[P, E],
  checkPermission: CheckPermissionProc[E],
  updateProc: UpdateProc[P, E],
  serialize: SerializeProc[E, S]
): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let params: P = ctx.extractQueryParams(P)
    var newEntry: E = ctx.request.body().fromJson(E)
    checkPermission(ctx, newEntry)

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        let oldEntry: E = connection.readProc(params)
        checkPermission(ctx, oldEntry)
        let newUpdatedEntry: E = connection.updateProc(params, newEntry)
        let data: S = connection.serialize(newUpdatedEntry)

        resp jsonyResponse(ctx, data)

proc createUpdateByIdHandler*[P: object, E: Model, S: object | ref object](serialize: SerializeProc[E, S]): HandlerAsync =
  result = createUpdateHandler[P, E, S](readArticleById, checkUpdatePermission, updateArticle, serialize)

proc createCreateHandler*[P: object, E: Model, S: object | ref object](
  checkPermission: CheckPermissionProc[E],
  createProc: CreateProc[P, E], 
  serialize: SerializeProc[E, S]
): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let params: P = ctx.extractQueryParams(P)

    var newEntry: E = params.body.fromJson(E)
    checkPermission(ctx, newEntry)

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        let newCreatedEntry: E = connection.createProc(params, newEntry)
        let data: S = connection.serialize(newCreatedEntry)

        resp jsonyResponse(ctx, data)

proc createCreateArticleHandler*[P: object, E: Model, S: object | ref object](serialize: SerializeProc[E, S]): HandlerAsync =
  result = createCreateHandler[P, E, S](checkCreatePermission, createArticle, serialize)


proc createReadListHandler*[P: ReadListParams, E: Model, S: object | ref object](
  readListProc: ReadListProc[P, E],
  checkPermission: CheckListPermissionProc[E],
  serialize: SerializeProc[E, S]
): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let params: P = ctx.extractQueryParams(P)

    respondBadRequestOnDbError():
      withDbConn(connection):
        let entries: seq[E] = readListProc(connection, params)
        checkPermission(ctx, entries)
        let data: seq[S] = entries.map(entry => connection.serialize(entry))

        resp jsonyResponse(ctx, data)

proc createReadCampaignListHandler*[P: ReadListParams, E: Model, S: object | ref object](
  serialize: SerializeProc[E, S]
): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let params: P = ctx.extractQueryParams(P)
    checkReadListPermission(ctx, params.campaignName)

    respondBadRequestOnDbError():
      withDbConn(connection):
        let entries: seq[E] = readCampaignArticleList[P, E](connection, params)
        let data: seq[S] = entries.map(entry => connection.serialize(entry))

        resp jsonyResponse(ctx, data)

proc createDeleteHandler*[P: object, E: Model](
  readProc: ReadProc[P, E],
  checkPermission: CheckPermissionProc[E],
  delete: DeleteProc[E]
): HandlerAsync =
  result = proc (ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let params: DeleteParams = ctx.extractQueryParams(DeleteParams)

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        var entryToDelete: E = connection.readProc(params)
        checkPermission(ctx, entryToDelete)
        connection.delete(entryToDelete)
      
        respDefault(Http204)

proc createDeleteByIdHandler*[P: object, E: Model](): HandlerAsync =
  result = createDeleteHandler[P, E](readArticleById, checkDeletePermission, deleteArticle)