import prologue
import ../../middleware/[loginMiddleware]
import markerTypeControllers
import markerTypeService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers


proc addMarkerTypeRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/markerType/{CAMPAIGN_NAME_PATTERN}/",
        handler = createEntryCreationHandler(MarkerType, getMarkerTypeSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/markerType/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(MarkerType, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/markerType/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(MarkerType, ID_PARAM, getMarkerTypeSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/markerType/", 
        createReadListHandler(getMarkerTypeSerialization),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

   