import prologue
import ../../middleware/[loginMiddleware]
import mapService
import mapSerialization
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import mapModel


proc addMapRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/map/{CAMPAIGN_NAME_PATTERN}/",
        handler = createCreateArticleHandler[CreateParams, Map, MapSerializable](serializeMap),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/map/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Map](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/map/pk/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Map, MapSerializable](serializeMap),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/map/pk/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, MapRead, MapSerializable](serializeMapRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/map/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, MapRead, MapOverviewSerializable](overviewSerialize),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/map/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadByNameHandler[ReadByNameParams, MapRead, MapSerializable](serializeMapRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
