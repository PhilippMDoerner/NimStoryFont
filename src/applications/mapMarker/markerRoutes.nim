import prologue
import ../../middleware/[loginMiddleware]
import markerService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import markerSerialization
import markerUtils


proc addMarkerRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/marker/{CAMPAIGN_NAME_PATTERN}/",
        handler = createCreateArticleHandler[CreateParams, Marker, MarkerSerializable](serializeMarker),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/marker/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Marker](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/marker/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Marker, MarkerSerializable](serializeMarker),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/marker/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, MarkerRead, MarkerSerializable](serializeMarkerRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/marker/{CAMPAIGN_NAME_PATTERN}/{PARENT_LOCATION_NAME_PATTERN}/{LOCATION_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}", 
        handler = createReadHandler[ReadMarkerByNameParams, MarkerRead, MarkerSerializable](getMarkerByParam, serializeMarkerRead), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
