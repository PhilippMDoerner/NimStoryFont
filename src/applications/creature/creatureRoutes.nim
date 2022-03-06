import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import creatureControllers
import std/strformat
import ../urlParamRegexPatterns

proc addCreatureRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME}/",
        handler = creatureControllers.createCreatureView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID}/", 
        handler = creatureControllers.deleteCreatureView,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID}/", 
        handler = creatureControllers.updateCreatureView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID}/", 
        creatureControllers.getCreatureByIdView, 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME}/overview/", 
        creatureControllers.getCampaignCreaturesOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
    
    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME}/{ARTICLE_NAME}/", 
        creatureControllers.getCreatureByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
   
