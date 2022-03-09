import prologue
import ../../middleware/loginMiddleware
import ../urlParamRegexPatterns
import characterControllers
import std/strformat

proc addCharacterRoutes*(app: Prologue) =
    app.addRoute(
        re"/character/",
        handler = characterControllers.createCharacterView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID_PATTERN}/", 
        handler = characterControllers.deleteCharacterView,
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
   
