import std/strformat
import prologue
import ../allUrlParams
import ./itemService
import ./itemSerialization
import ../genericArticleControllers
import ../../middleware/[loginMiddleware]

proc addItemRoutes*(app: Prologue) =
    app.addRoute(
        re"/item/",
        handler = createCreateArticleHandler[CreateParams, Item, ItemSerializable](serializeItem),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Item](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/pk/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Item, ItemSerializable](serializeItem),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/pk/{ID_PATTERN}/", 
        handler = createPatchByIdHandler[UpdateParams, Item, ItemSerializable](serializeItem),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/pk/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, ItemRead, ItemSerializable](serializeItemRead), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, ItemRead, ItemOverviewSerializable](overviewSerialize),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/item/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadByNameHandler[ReadByNameParams, ItemRead, ItemSerializable](serializeItemRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
