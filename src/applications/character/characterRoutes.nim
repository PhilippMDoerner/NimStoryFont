import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import characterControllers
import characterModel
import characterSerializable
import characterService
import std/strformat
import ../genericArticleControllers

proc addCharacterRoutes*(app: Prologue) =
    app.addRoute(
        re"/character/",
        handler = createEntryCreationHandler(Character, getFullCharacterData),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Character, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Character, ID_PARAM, getFullCharacterData),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID_PATTERN}/", 
        handler = createEntryReadByIdHandler(ID_PARAM, getCharacterById), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignCharacterList),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        characterControllers.getCharacterByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
