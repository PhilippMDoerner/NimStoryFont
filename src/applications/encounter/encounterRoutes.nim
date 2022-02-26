import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import encounterControllers

proc addEncounterRoutes*(app: Prologue) =
    app.addRoute(
       re"/encounter/(?P<campaignName>[^/]+)/orderswap/",
       handler = encounterControllers.swapEncounterOrder,
       httpMethod = HttpPatch,
       middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/(?P<campaignName>[^/]+)/",
        handler = encounterControllers.createEncounterView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/(?P<campaignName>[^/]+)/(?P<id>[\d]+)/", 
        handler = encounterControllers.deleteEncounterView,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/(?P<campaignName>[^/]+)/(?P<id>[\d]+)/", 
        handler = encounterControllers.updateEncounterView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )
   

