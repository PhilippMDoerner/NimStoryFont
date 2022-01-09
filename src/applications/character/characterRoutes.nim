import prologue
import ../../middleware/loginMiddleware
import characterControllers

proc addCharacterRoutes*(app: Prologue) =
    app.addRoute(
        re"/character/",
        handler = characterControllers.createCharacterView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/character/(?P<id>[\d]+)/", 
        handler = characterControllers.deleteCharacterView,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/character/(?P<id>[\d]+)/", 
        handler = characterControllers.updateCharacterView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/character/(?P<id>[\d]+)/", 
        characterControllers.getCharacterByIdView, 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/character/(?P<campaignName>[^/]+)/overview/", 
        characterControllers.getCampaignCharactersOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re"/character/(?P<campaignName>[^/]+)/(?P<characterName>[^/]+)/", 
        characterControllers.getCharacterByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
