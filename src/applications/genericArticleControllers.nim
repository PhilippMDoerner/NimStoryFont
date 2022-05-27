import prologue
import std/[strutils, sequtils, sugar, uri]
import ../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import tinypool
import controllerTemplates
import genericArticleService
import genericArticleRepository
import genericDeserialization
import authentication/authenticationUtils
import ../utils/djangoDateTime/[normConversion, serialization]
import norm/[model]
import jsony
import allUrlParams

export jsony
export serialization
export serializationUtils
export normConversion
export genericArticleService
export genericDeserialization

export authenticationUtils


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
    fieldValue = ctx.getPathParams(fieldName).decodeUrl()
  elif fieldValue is bool:
    fieldValue = parseBool(ctx.getPathParams(fieldName))
  else:
    assert(false, fmt"Tried extracting query parameter {fieldName} which was neither an int, string or bool or an Option of those types") 

proc extractQueryParams[Q: object](ctx: JWTContext, dataContainerType: typedesc[Q]): Q =
  mixin init

  result = init(Q)

  for fieldName, fieldValue in result.fieldPairs:
    extractQueryParam(ctx, fieldName, fieldValue)

type CreateProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS, newEntry: var ENTRY): ENTRY
type ReadProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS): ENTRY
type ReadListProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS): seq[ENTRY]
type UpdateProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS): ENTRY
type PatchProc*[REQUESTPARAMS: object, ENTRY: Model] = proc(connection: DbConn, params: REQUESTPARAMS, entryToPatch: ENTRY): ENTRY
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
  const readProc: ReadProc[P, E] = readArticleById[P, E]
  const checkPermissionProc: CheckPermissionProc[E] = checkReadPermission[E]
  result = createReadHandler[P, E, S](readProc, checkPermissionProc, serialize)

proc createReadByNameHandler*[P: object, E: Model, S: object | ref object](serialize: SerializeProc[E, S]): HandlerAsync =
  const readProc: ReadProc[P, E] = readArticleByName[P, E]
  const checkPermissionProc: CheckPermissionProc[E] = checkReadPermission[E]
  result = createReadHandler[P, E, S](readProc, checkReadPermission, serialize)



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
        let newUpdatedEntry: E = connection.updateProc(params)
        let data: S = connection.serialize(newUpdatedEntry)

        resp jsonyResponse(ctx, data)

proc createUpdateByIdHandler*[P: object, E: Model, S: object | ref object](serialize: SerializeProc[E, S]): HandlerAsync =
  const readProc: ReadProc[P, E] = readArticleById[P, E]
  const checkPermissionProc: CheckPermissionProc[E] = checkUpdatePermission[E]
  const updateProc: UpdateProc[P, E] = updateArticle[P, E]
  result = createUpdateHandler[P, E, S](readProc, checkPermissionProc, updateProc, serialize)

proc createPatchHandler*[P: object, E: Model, S: object | ref object](
  readProc: ReadProc[P, E],
  checkPermission: CheckPermissionProc[E],
  patchEntryWithJsonProc: PatchProc[P, E],
  serialize: SerializeProc[E, S]
): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    mixin jsonToModelFieldNameRemappings

    let ctx = JWTContext(ctx)

    var params: P = ctx.extractQueryParams(P)

    when defined(jsonToModelFieldNameRemappings):
      params.jsonToModelFieldNameRemappings = jsonToModelFieldNameRemappings

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        var oldEntry: E = connection.readProc(params)
        checkPermission(ctx, oldEntry)

        try:         
          let newUpdatedEntry: E = connection.patchEntryWithJsonProc(params, oldEntry)

          let data: S = connection.serialize(newUpdatedEntry)

          resp jsonyResponse(ctx, data)

        except OutdatedDataError:
          resp outdatedUpdateResponse(ctx, oldEntry)

proc createPatchByIdHandler*[P: object, E: Model, S: object | ref object](
  serialize: SerializeProc[E, S]
): HandlerAsync =
  const readProc: ReadProc[P, E] = readArticleById[P, E]
  const patchProc: PatchProc[P, E] = patchArticle[P, E]
  const checkPermissionProc: CheckPermissionProc[E] = checkUpdatePermission[E]
  result = createPatchHandler[P, E, S](readProc, checkPermissionProc, patchArticle, serialize)



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
  const checkPermissionProc: CheckPermissionProc[E] = checkCreatePermission[E]
  const createProc: CreateProc[P, E] = createArticle[P, E]
  result = createCreateHandler[P, E, S](checkPermissionProc, createProc, serialize)



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
  deleteProc: DeleteProc[E]
): HandlerAsync =
  result = proc (ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let params: DeleteParams = ctx.extractQueryParams(DeleteParams)

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        var entryToDelete: E = connection.readProc(params)
        checkPermission(ctx, entryToDelete)
        connection.deleteProc(entryToDelete)
      
        respDefault(Http204)

proc createDeleteByIdHandler*[P: object, E: Model](): HandlerAsync =
  const checkPermissionProc: CheckPermissionProc[E] = checkDeletePermission[E]
  const readProc: ReadProc[P, E] = readArticleById[P, E]
  const deleteProc: DeleteProc[E] = deleteArticle[E]
  result = createDeleteHandler[P, E](readProc, checkPermissionProc, deleteProc)