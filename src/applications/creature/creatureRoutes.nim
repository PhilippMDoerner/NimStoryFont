import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import creatureControllers

proc addCreatureRoutes*(app: Prologue) =
    app.addRoute(
        re"/creature/(?P<campaignName>[^/]+)/",
        handler = creatureControllers.createCreatureView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/creature/(?P<id>[\d]+)/", 
        handler = creatureControllers.deleteCreatureView,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/creature/(?P<id>[\d]+)/", 
        handler = creatureControllers.updateCreatureView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/creature/(?P<id>[\d]+)/", 
        creatureControllers.getCreatureByIdView, 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re"/creature/(?P<campaignName>[^/]+)/overview/", 
        creatureControllers.getCampaignCreaturesOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
    
    app.addRoute(
        re"/creature/(?P<campaignName>[^/]+)/(?P<creatureName>[^/]+)/", 
        creatureControllers.getCreatureByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
   
