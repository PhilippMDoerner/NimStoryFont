import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import questModel
import questService
import questSerialization
import std/strformat
import ../genericArticleControllers

proc addQuestRoutes*(app: Prologue) =
    app.addRoute(
        re"/quest/",
        handler = createCreateArticleHandler[CreateParams, Quest, QuestSerializable](serializeQuest),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Quest](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Quest, QuestSerializable](serializeQuest),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, QuestRead, QuestSerializable](serializeQuestRead), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quest/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, QuestOverview, QuestOverviewSerializable](overviewSerialize),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/quest/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadByNameHandler[ReadByNameParams, QuestRead, QuestSerializable](serializeQuestRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
