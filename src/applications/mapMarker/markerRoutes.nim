import prologue
import ../../middleware/[loginMiddleware]
import markerControllers
import markerService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import markerModel


proc addMarkerRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/marker/{CAMPAIGN_NAME_PATTERN}/",
        handler = createEntryCreationHandler(Marker, getMarkerSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/marker/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Marker, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/marker/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Marker, ID_PARAM, getMarkerSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/marker/{ID_PATTERN}/", 
        createEntryReadByIdHandler(ID_PARAM, getMarkerById),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/marker/{CAMPAIGN_NAME_PATTERN}/{PARENT_LOCATION_NAME_PATTERN}/{LOCATION_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}", 
        markerControllers.getMarkerByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
