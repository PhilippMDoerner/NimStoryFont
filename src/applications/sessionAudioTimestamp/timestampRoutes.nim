import prologue
import ../../middleware/[loginMiddleware]
import timestampService
import timestampSerialization
import timestampUtils
import std/strformat
import ../authentication/authenticationUtils
import ../allUrlParams
import ../genericArticleControllers
import ../genericArticleRepository

proc addTimestampRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/timestamp/{CAMPAIGN_NAME_PATTERN}/",
        handler = createCreateHandler[CreateParams, Timestamp, TimestampSerializable](checkCreatePermission, createTimestamp, serializeTimestamp),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/timestamp/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Timestamp](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/timestamp/{CAMPAIGN_NAME_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/{SESSION_NUMBER_PATTERN}/", 
        handler = createReadListHandler(getTimestampsForSessionAudio, checkReadTimestampListPermission, serializeTimestampRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
   