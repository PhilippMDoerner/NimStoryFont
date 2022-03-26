import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import spellControllers
import spellModel
import spellService
import std/strformat
import ../genericArticleControllers

proc addSpellRoutes*(app: Prologue) =
    app.addRoute(
        re"/spell/",
        handler = createEntryCreationHandler(Spell, getSpellSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/spell/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Spell, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/spell/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Spell, ID_PARAM, getSpellSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/spell/{ID_PATTERN}/", 
        handler = createEntryReadByIdHandler(ID_PARAM, getSpellById), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/spell/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignSpellList),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/spell/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        getSpellByNameController,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
