import std/strformat
import prologue
import ./timestampService
import ./timestampSerialization
import ./timestampUtils
import ../authentication/authenticationUtils
import ../allUrlParams
import ../genericArticleControllers
import ../genericArticleRepository
import ../../middleware/[loginMiddleware]

proc addTimestampRoutes*(app: Prologue) =
  app.addRoute(
    re fmt"/timestamp/",
    handler = createCreateHandler[CreateParams, Timestamp, TimestampSerializable](
      checkCreatePermission, createTimestamp, serializeTimestamp
    ),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/timestamp/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, Timestamp](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/timestamp/{CAMPAIGN_NAME_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/{SESSION_NUMBER_PATTERN}/",
    handler = createReadListHandler(
      getTimestampsForSessionAudio, checkReadTimestampListPermission,
      serializeTimestampReads,
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
