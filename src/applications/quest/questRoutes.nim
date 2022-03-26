import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import questControllers
import questModel
import questService
import std/strformat
import ../genericArticleControllers

proc addQuestRoutes*(app: Prologue) =
    app.addRoute(
        re"/quest/",
        handler = createEntryCreationHandler(Quest, getQuestSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Quest, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Quest, ID_PARAM, getQuestSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{ID_PATTERN}/", 
        handler = createEntryReadByIdHandler(ID_PARAM, getQuestById), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignQuestList),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/quest/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        getQuestByNameController,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
