import prologue
import ../applications/authentication/myJwt

export myJwt
export tokenTypes

type JWTContext* = ref object of Context
    tokenData*: TokenData

method extend(ctx: JWTContext) =    
    ctx.tokenData = newTokenData()

proc extractQueryParam[T](ctx: JWTContext, fieldName: static string, fieldValue: var T) =
  ## Extracts all releavant URL parameters and the HTTP body from the request and into a defined object
  ## TODO: Figure out how to check if a url param exists at compiletime
  when fieldName == "body":
    fieldValue = ctx.request.body()
  elif fieldValue is TokenData:
    fieldValue = ctx.tokenData
  elif fieldValue is Option:
    fieldValue = extractQueryParam(ctx, fieldName, fieldValue)
  elif fieldValue is int:
    fieldValue = parseInt(ctx.getPathParams(fieldName))
  elif fieldValue is int64:
    fieldValue = parseInt(ctx.getPathParams(fieldName)).int64
  elif fieldValue is string:
    fieldValue = ctx.getPathParams(fieldName)
  elif fieldValue is bool:
    fieldValue = parseBool(ctx.getPathParams(fieldName))
  else:
    assert(false, fmt"Tried extracting query parameter '{fieldName}' of not understood type. Currently can only extract the request body and parameters of type int, int64, string, bool or an option of those types") 

proc extractQueryParams*[Q: object](ctx: JWTContext, dataContainerType: typedesc[Q]): Q =
  mixin init

  result = init(Q)

  for fieldName, fieldValue in result.fieldPairs:
    extractQueryParam(ctx, fieldName, fieldValue)
