import std/strformat
import prologue except Session
import ./sessionSerialization
import ./sessionModel
import ./sessionService
import ../genericArticleControllers
import ../../middleware/[loginMiddleware]
import ../allUrlParams

proc addSessionRoutes*(app: Prologue) =
  app.addRoute(
    re"/session/",
    handler = createCreateArticleHandler[CreateParams, Session, SessionSerializable](
      serializeSession
    ),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/session/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, Session](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/session/pk/{ID_PATTERN}/",
    handler = createUpdateByIdHandler[UpdateParams, Session, SessionSerializable](
      serializeSession
    ),
    httpMethod = HttpPut,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/session/pk/{ID_PATTERN}/",
    handler = createPatchByIdHandler[UpdateParams, Session, SessionSerializable](
      serializeSession
    ),
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/session/{CAMPAIGN_NAME_PATTERN}/overview/",
    handler = createReadListHandler[
      ReadListParams, SessionRead, SessionOverviewSerializable
    ](getCampaignSessions, checkCampaignReadListPermission, overviewSerialize),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/session/{CAMPAIGN_NAME_PATTERN}/",
    handler = createReadCampaignListHandler[
      ReadListParams, SessionRead, SessionSerializable
    ](serializeSessionReads),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/session/{CAMPAIGN_NAME_PATTERN}/{SESSION_NUMBER_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/",
    handler = createReadHandler[ReadSessionByParams, SessionRead, SessionSerializable](
      getSessionByParams, checkReadPermission, serializeSessionRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/session/pk/{ID_PATTERN}/",
    handler = createReadByIdHandler[ReadByIdParams, SessionRead, SessionSerializable](
      serializeSessionRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
