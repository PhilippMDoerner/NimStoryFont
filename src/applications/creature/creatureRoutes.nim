import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import creatureControllers
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import creatureModel

proc addCreatureRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/",
        handler = creatureControllers.createCreatureView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Creature),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        handler = creatureControllers.updateCreatureView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        creatureControllers.getCreatureByIdView, 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/overview/", 
        creatureControllers.getCampaignCreaturesOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
    
    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        creatureControllers.getCreatureByNameView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
   
