import prologue except Session
import ../../middleware/[campaignAccessMiddleware, loginMiddleware]
import ../allUrlParams
import sessionControllers
import sessionModel
import sessionService
import ../genericArticleControllers
import std/strformat

proc addSessionRoutes*(app: Prologue) =
    app.addRoute(
        re"/session/",
        handler = createEntryCreationHandler(Session, getSerializedSession),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/session/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Session, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/session/{ID_PATTERN}/",
        handler = createEntryUpdateHandler(Session, ID_PARAM, getSerializedSession),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/session/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignSessionListOverview),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/session/{CAMPAIGN_NAME_PATTERN}/{SESSION_NUMBER_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/", 
        handler = getSessionByParamsController,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
