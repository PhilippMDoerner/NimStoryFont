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
        handler = characterControllers.updateCharacterView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID_PATTERN}/", 
        characterControllers.getCharacterByIdView, 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/overview/", 
        characterControllers.getCampaignCharactersOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        characterControllers.getCharacterByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
