import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import userService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import userModel
import userRequestParams

proc addUserRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/user/",
        handler = createSimpleHandler(createUser),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(User, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createSimpleHandler(updateUser),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createSimpleHandler(getUserById),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createSimpleHandler(getCampaignUserListOverview),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

