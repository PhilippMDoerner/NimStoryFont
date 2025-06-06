import std/strformat
import prologue
import ./markerService
import ./markerSerialization
import ./markerUtils
import ../allUrlParams
import ../genericArticleControllers
import ../authentication/authenticationUtils
import ../../middleware/[loginMiddleware]

proc addMarkerRoutes*(app: Prologue) =
  app.addRoute(
    re fmt"/marker/",
    handler = createCreateArticleHandler[CreateParams, Marker, MarkerSerializable](
      serializeMarker
    ),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/marker/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, Marker](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/marker/pk/{ID_PATTERN}/",
    handler =
      createUpdateByIdHandler[UpdateParams, Marker, MarkerSerializable](serializeMarker),
    httpMethod = HttpPut,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/marker/pk/{ID_PATTERN}/",
    handler =
      createPatchByIdHandler[UpdateParams, Marker, MarkerSerializable](serializeMarker),
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/marker/pk/{ID_PATTERN}/",
    handler = createReadByIdHandler[ReadByIdParams, MarkerRead, MarkerSerializable](
      serializeMarkerRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/marker/{CAMPAIGN_NAME_PATTERN}/{PARENT_LOCATION_NAME_PATTERN}/{LOCATION_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}",
    handler = createReadHandler[ReadMarkerByNameParams, MarkerRead, MarkerSerializable](
      getMarkerByParam, checkReadPermission, serializeMarkerRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
