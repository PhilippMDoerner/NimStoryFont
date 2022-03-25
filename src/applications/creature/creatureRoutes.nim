import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import creatureControllers
import creatureService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import creatureModel

proc addCreatureRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/",
        handler = createEntryCreationHandler(Creature, getCreatureSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Creature, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Creature, ID_PARAM, getCreatureSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        createEntryReadByIdHandler(Creature, ID_PARAM, getCreatureById),  
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
   
