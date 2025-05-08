import std/strformat
import prologue
import ./markerTypeService
import ./markerTypeSerialization
import ./markerTypeUtils
import ../allUrlParams
import ../genericArticleControllers
import ../../middleware/[loginMiddleware]

proc addMarkerTypeRoutes*(app: Prologue) =
  app.addRoute(
    re fmt"/markertype/",
    handler = createCreateHandler[CreateParams, MarkerType, MarkerTypeSerializable](
      checkCampaignOrGlobalWritePermission, createArticle, serializeMarkerType
    ),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/markertype/pk/{ID_PATTERN}/",
    handler = createDeleteHandler[DeleteParams, MarkerType](
      readArticleById, checkCampaignOrGlobalWritePermission, deleteArticle
    ),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/markertype/pk/{ID_PATTERN}/",
    handler = createUpdateHandler[UpdateParams, MarkerType, MarkerTypeSerializable](
      readArticleById, checkCampaignOrGlobalWritePermission, updateArticle,
      serializeMarkerType,
    ),
    httpMethod = HttpPut,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/markertype/pk/{ID_PATTERN}/",
    handler = createPatchHandler[UpdateParams, MarkerType, MarkerTypeSerializable](
      readArticleById, checkCampaignOrGlobalWritePermission, patchArticle,
      serializeMarkerType,
    ),
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/markertype/",
    handler = createReadListHandler(
      readListProc = getMarkerTypes,
      checkPermission = checkReadMarkerTypeListPermission,
      serialize = serializeMarkerTypes,
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/markertype/{CAMPAIGN_NAME_PATTERN}/overview/",
    handler = createReadListHandler(
      readListProc = getCampaignMarkerTypes,
      checkPermission = checkReadMarkerTypeListPermission,
      serialize = serializeMarkerTypes,
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
