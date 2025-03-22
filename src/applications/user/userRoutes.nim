import std/strformat
import prologue
import ./userControllers
import ./userService
import ./userRequestParams
import ./userSerialization
import ./userUtils
import ../authentication/authenticationUtils
import ../genericArticleControllers
import ../../middleware/[loginMiddleware]

proc addUserRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/user/",
        handler = createCreateHandler[CreateParams, User, UserSerializable](checkAdminPermission, createUser, serializeUser),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/pk/{ID_PATTERN}/", 
        handler = createDeleteHandler[DeleteParams, User](readUserById, checkUserDeletePermission, deleteUser),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/pk/{ID_PATTERN}/", 
        handler = createUpdateHandler[UpdateParams, User, UserSerializable](
            readProc = readUserById, 
            checkPermission = checkUserDeletePermission, 
            updateProc = updateUser, 
            serialize = serializeUser
        ),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/pk/{ID_PATTERN}/",
        handler = createPatchHandler[UpdateParams, User, UserSerializable](
            readProc = readUserById,
            checkPermission = checkUserDeletePermission,
            patchEntryWithJsonProc = patchUser,
            serialize = serializeUser
        ),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/pk/{ID_PATTERN}/", 
        handler = createReadHandler[ReadByIdParams, User, UserSerializable](
            readUserById, 
            checkUserDeletePermission, 
            serializeUser
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadListHandler[ReadListParams, User, UserSerializable](
            getCampaignUserListOverview, 
            checkCampaignReadListPermission, 
            serializeUsers
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        "/user/",
        handler = createReadListHandler(
            readListProc = getUsers,
            checkPermission = checkNoUserPermission,
            serialize = serializeUsers
        ),
        httpMethod = HttpGet
    )

    app.addRoute(
        re fmt"/user/me/settings/{SETTING_CATEGORY_PATTERN}/",
        handler = getSettingsCategory,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
        
    )
    
    app.addRoute(
        re fmt"/user/me/settings/",
        handler = createCreateHandler[CreateParams, UserMetadata, UserMetadataSerializable](
            checkPermission = checkNoUserMetaPermission,
            createProc = createUserMetadata,
            serialize = serializeUserMetadata
        ),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )