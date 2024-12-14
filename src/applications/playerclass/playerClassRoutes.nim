import prologue
import ../../middleware/[loginMiddleware]
import playerClassService
import playerClassSerialization
import playerClassModel
import playerClassUtils
import std/strformat
import ../allUrlParams
import ../genericArticleControllers

proc addPlayerClassRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/player_class/",
        handler = createCreateHandler[CreateParams, PlayerClass, PlayerClassSerializable](
            checkPlayerClassPermission,
            createArticle,
            serializePlayerClass
        ),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/player_class/pk/{ID_PATTERN}/", 
        handler = createDeleteHandler[DeleteParams, PlayerClass](
            readArticleById,
            checkPlayerClassPermission,
            deleteArticle
        ),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/player_class/pk/{ID_PATTERN}/", 
        handler = createUpdateHandler[UpdateParams, PlayerClass, PlayerClassSerializable](
            readArticleById,
            checkPlayerClassPermission,
            updateArticle,
            serializePlayerClass
        ),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/player_class/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadListHandler[ReadListParams, PlayerClass, PlayerClassSerializable](
          getCampaignPlayerClasses,
          checkPlayerClassPermission,
          serializePlayerClasses
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
    app.addRoute(
        re fmt"/player_class/", 
        handler = createReadListHandler[ReadListParams, PlayerClass, PlayerClassSerializable](
          getPlayerClasses,
          checkPlayerClassPermission,
          serializePlayerClasses
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   

    app.addRoute(
        re fmt"/characterplayerclassconnection/",
        handler = createCreateHandler[CreateParams, PlayerClassConnection, PlayerClassConnectionSerializable](
            checkPlayerClassConnectionCreatePermission,
            createPlayerClassConnection,
            serializePlayerClassConnection
        ),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )


    app.addRoute(
        re fmt"/characterplayerclassconnection/pk/{ID_PATTERN}/",
        handler = createDeleteByIdHandler[DeleteParams, PlayerClassConnection](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )