import prologue
import ../../middleware/[loginMiddleware]
import mapControllers
import mapService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import mapModel


proc addMapRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/map/{CAMPAIGN_NAME_PATTERN}/",
        handler = createEntryCreationHandler(Map, getMapSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/map/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Map, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/map/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Map, ID_PARAM, getMapSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/map/{ID_PATTERN}/", 
        createEntryReadByIdHandler(ID_PARAM, getMapById),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/map/{CAMPAIGN_NAME_PATTERN}/overview/", 
        createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignMapListOverview),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/map/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        mapControllers.getMapByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
