import prologue
import ../../middleware/[loginMiddleware]
import ../allUrlParams
import itemControllers
import itemModel
import itemService
import std/strformat
import ../genericArticleControllers

proc addItemRoutes*(app: Prologue) =
    app.addRoute(
        re"/item/",
        handler = createEntryCreationHandler(Item, getSerializedItem),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Item, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Item, ID_PARAM, getSerializedItem),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/{ID_PATTERN}/", 
        handler = createEntryReadByIdHandler(ID_PARAM, getItemById), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/item/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignItemListOverview),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/item/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        getItemByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
