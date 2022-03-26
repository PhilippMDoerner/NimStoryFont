import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import ruleControllers
import ruleModel
import ruleService
import std/strformat
import ../genericArticleControllers

proc addRuleRoutes*(app: Prologue) =
    app.addRoute(
        re"/rule/",
        handler = createEntryCreationHandler(Rule, getRuleSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/rule/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Rule, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/rule/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Rule, ID_PARAM, getRuleSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/rule/{ID_PATTERN}/", 
        handler = createEntryReadByIdHandler(ID_PARAM, getRuleById), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/rule/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignRulesList),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/rule/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        getRuleByNameController,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
