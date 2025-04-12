import prologue
import ../../middleware/[loginMiddleware]
import creatureService
import creatureSerialization
import std/strformat
import ../allUrlParams
import ../genericArticleControllers

proc addCreatureRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/creature/",
        handler = createCreateArticleHandler[CreateParams, Creature, CreatureSerializable](serializeCreature),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Creature](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/pk/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Creature, CreatureSerializable](serializeCreature),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/pk/{ID_PATTERN}/", 
        handler = createPatchByIdHandler[UpdateParams, Creature, CreatureSerializable](serializeCreature),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/pk/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, CreatureRead, CreatureSerializable](serializeCreatureRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, CreatureOverview, CreatureOverviewSerializable](overviewSerialize),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadByNameHandler[ReadByNameParams, CreatureRead, CreatureSerializable](serializeCreatureRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
