import prologue
import ../../middleware/loginMiddleware
import creatureControllers

proc addCreatureRoutes*(app: Prologue) =
    app.addRoute(
        re"/creature/",
        handler = creatureControllers.createCreatureView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/creature/(?P<id>[\d]+)/", 
        handler = creatureControllers.deleteCreatureView,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/creature/(?P<id>[\d]+)/", 
        handler = creatureControllers.updateCreatureView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/creature/(?P<id>[\d]+)/", 
        creatureControllers.getCreatureByIdView, 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/creature/(?P<campaignName>[^/]+)/overview/", 
        creatureControllers.getCampaignCreaturesOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re"/creature/(?P<campaignName>[^/]+)/(?P<creatureName>[^/]+)/", 
        creatureControllers.getCreatureByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
