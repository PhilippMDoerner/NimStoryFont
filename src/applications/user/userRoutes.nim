import prologue
import ../../middleware/[loginMiddleware]
import userService
import std/strformat
import ../genericArticleControllers
import userRequestParams
import userSerialization
import userUtils
import ../authentication/authenticationUtils

proc addUserRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/user/",
        handler = createCreateHandler[CreateParams, User, UserSerializable](checkAdminPermission, createUser, serializeUser),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createDeleteHandler[DeleteParams, User](readUserById, checkUserDeletePermission, deleteUser),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createUpdateHandler[UpdateParams, User, UserSerializable](
            readProc = readUserById, 
            checkPermission = checkUserDeletePermission, 
            updateProc = updateUser, 
            serialize = serializeUser
        ),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )
    # createUpdateHandler[UpdateParams, MarkerType, MarkerTypeSerializable](readArticleById, checkAdminPermission, updateArticle, serializeMarkerType)
    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createReadHandler[ReadByIdParams, UserRead, UserSerializable](readUserById, checkUserDeletePermission, serializeUserRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadListHandler[ReadListParams, UserOverview, UserOverviewSerializable](getCampaignUserListOverview, checkCampaignReadListPermission, overviewSerialize),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

