import prologue
import ../../middleware/[loginMiddleware]
import campaignControllers
import std/strformat
import ../allUrlParams
import ../genericArticleControllers

proc addCampaignRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/campaign/{CAMPAIGN_NAME_PATTERN}/members/",
        handler = changeMembership,
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )
    # app.addRoute(
    #     re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/",
    #     handler = createCreateArticleHandler[CreateParams, Creature, CreatureSerializable](serialize),
    #     httpMethod = HttpPost,
    #     middlewares = @[loginMiddleware()]
    # )

    # app.addRoute(
    #     re fmt"/creature/{ID_PATTERN}/", 
    #     handler = createDeleteByIdHandler[DeleteParams, Creature](),
    #     httpMethod = HttpDelete,
    #     middlewares = @[loginMiddleware()]
    # )

    # app.addRoute(
    #     re fmt"/creature/{ID_PATTERN}/", 
    #     handler = createUpdateByIdHandler[UpdateParams, Creature, CreatureSerializable](serialize),
    #     httpMethod = HttpPut,
    #     middlewares = @[loginMiddleware()]
    # )

    # app.addRoute(
    #     re fmt"/creature/{ID_PATTERN}/", 
    #     handler = createReadByIdHandler[ReadByIdParams, Creature, CreatureSerializable](serialize),  
    #     httpMethod = HttpGet,
    #     middlewares = @[loginMiddleware()]
    # )

    # app.addRoute(
    #     re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/overview/", 
    #     handler = createReadCampaignListHandler[ReadListParams, CreatureOverview, CreatureOverviewSerializable](overviewSerialize),  
    #     httpMethod = HttpGet,
    #     middlewares = @[loginMiddleware()]
    # )
    
    # app.addRoute(
    #     re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
    #     handler = createReadByNameHandler[ReadByNameParams, CreatureRead, CreatureSerializable](serialize),  
    #     httpMethod = HttpGet,
    #     middlewares = @[loginMiddleware()]
    # )
   
