import std/strformat
import prologue
import ./playerClassService
import ./playerClassSerialization
import ./playerClassModel
import ./playerClassUtils
import ../allUrlParams
import ../genericArticleControllers
import ../../middleware/[loginMiddleware]

proc addPlayerClassRoutes*(app: Prologue) =
  app.addRoute(
    re fmt"/player_class/",
    handler = createCreateHandler[CreateParams, PlayerClass, PlayerClassSerializable](
      checkCampaignOrGlobalWritePermission, createArticle, serializePlayerClass
    ),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/player_class/pk/{ID_PATTERN}/",
    handler = createDeleteHandler[DeleteParams, PlayerClass](
      readArticleById, checkCampaignOrGlobalWritePermission, deleteArticle
    ),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/player_class/pk/{ID_PATTERN}/",
    handler = createUpdateHandler[UpdateParams, PlayerClass, PlayerClassSerializable](
      readArticleById, checkCampaignOrGlobalWritePermission, updateArticle,
      serializePlayerClass,
    ),
    httpMethod = HttpPut,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/player_class/{CAMPAIGN_NAME_PATTERN}/overview/",
    handler = createReadListHandler[
      ReadListParams, PlayerClass, PlayerClassSerializable
    ](getCampaignPlayerClasses, checkCampaignReadListPermission, serializePlayerClasses),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/player_class/",
    handler = createReadListHandler[
      ReadListParams, PlayerClass, PlayerClassSerializable
    ](getPlayerClasses, checkNoPermission, serializePlayerClasses),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/characterplayerclassconnection/",
    handler = createCreateHandler[
      CreateParams, PlayerClassConnection, PlayerClassConnectionSerializable
    ](
      checkPlayerClassConnectionCreatePermission, createPlayerClassConnection,
      serializePlayerClassConnection,
    ),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/characterplayerclassconnection/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, PlayerClassConnection](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )
