import prologue
import ../../middleware/[loginMiddleware]
import markerTypeService
import std/strformat
import markerTypeSerialization
import markerTypeDeserialization
import markerTypeUtils
import ../allUrlParams
import ../genericArticleControllers


proc addMarkerTypeRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/markertype/{CAMPAIGN_NAME_PATTERN}/",
        handler = createCreateHandler[CreateParams, MarkerType, MarkerTypeSerializable](checkAdminPermission, createArticle, serializeMarkerType),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/markertype/pk/{ID_PATTERN}/", 
        handler = createDeleteHandler[DeleteParams, MarkerType](readArticleById, checkAdminPermission, deleteArticle),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/markertype/pk/{ID_PATTERN}/", 
        handler = createUpdateHandler[UpdateParams, MarkerType, MarkerTypeSerializable](readArticleById, checkAdminPermission, updateArticle, serializeMarkerType),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/markertype/pk/{ID_PATTERN}/", 
        handler = createPatchHandler[UpdateParams, MarkerType, MarkerTypeSerializable](readArticleById, checkAdminPermission, updateArticle, serializeMarkerType),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/markertype/", 
        handler = createReadListHandler(
            readListProc = getMarkerTypes, 
            checkPermission = checkReadMarkerTypeListPermission, 
            serialize = serializeMarkerType
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

   
    app.addRoute(
        re fmt"/markertype/{CAMPAIGN_NAME_PATTERN}/overview", 
        handler = createReadListHandler(
            readListProc = getMarkerTypes, 
            checkPermission = checkReadMarkerTypeListPermission, 
            serialize = serializeMarkerType
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
