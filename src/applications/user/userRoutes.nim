import prologue
import ../../middleware/[loginMiddleware]
import userService
import std/strformat
import ../genericArticleControllers
import userModel
import userRequestParams

proc addUserRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/user/",
        handler = createSimpleHandler(CreateParams, createUser),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createSimpleDeletionHandler(DeleteParams, deleteUser),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createSimpleHandler(UpdateParams, updateUser),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createSimpleHandler(ReadByIdParams, getUserById),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createSimpleHandler(ReadListParams, getCampaignUserListOverview),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

