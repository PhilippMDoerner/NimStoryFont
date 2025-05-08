import std/strformat
import prologue
import ./questModel
import ./questService
import ./questControllers
import ./questSerialization
import ../allUrlParams
import ../genericArticleControllers
import ../../middleware/loginMiddleware

proc addQuestRoutes*(app: Prologue) =
    app.addRoute(
        re"/quest/",
        handler = createCreateArticleHandler[CreateParams, Quest, QuestSerializable](serializeQuest),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Quest](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/pk/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Quest, QuestSerializable](serializeQuest),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/pk/{ID_PATTERN}/", 
        handler = createPatchByIdHandler[UpdateParams, Quest, QuestSerializable](serializeQuest),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/pk/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, QuestRead, QuestSerializable](serializeQuestRead), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, QuestRead, QuestOverviewSerializable](overviewSerialize),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/quest/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadByNameHandler[ReadByNameParams, QuestRead, QuestSerializable](serializeQuestRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   

    app.addRoute(
        re fmt"/queststates", 
        handler = getQuestStates,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
