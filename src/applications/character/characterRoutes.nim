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
        re fmt"/character/{ID}/", 
        handler = characterControllers.deleteCharacterView,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID}/", 
        handler = characterControllers.updateCharacterView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID}/", 
        characterControllers.getCharacterByIdView, 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME}/overview/", 
        characterControllers.getCampaignCharactersOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME}/{ARTICLE_NAME}/", 
        characterControllers.getCharacterByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
