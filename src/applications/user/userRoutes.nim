import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import userService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import userModel


proc addUserRoutes*(app: Prologue) =
    # app.addRoute(
    #     re fmt"/user/{CAMPAIGN_NAME_PATTERN}/",
    #     handler = createEntryCreationHandler(User, getUserSerialization),
    #     httpMethod = HttpPost,
    #     middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    # )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(User, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    # app.addRoute(
    #     re fmt"/user/{ID_PATTERN}/", 
    #     handler = createEntryUpdateHandler(User, ID_PARAM, getUserSerialization),
    #     httpMethod = HttpPut,
    #     middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    # )

    app.addRoute(
        re fmt"/user/{ID_PATTERN}/", 
        createEntryReadByIdHandler(ID_PARAM, getUserById),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/user/{CAMPAIGN_NAME_PATTERN}/overview/", 
        createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignUserListOverview),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

