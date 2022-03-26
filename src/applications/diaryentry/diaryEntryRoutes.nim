import prologue
import ../../middleware/[campaignAccessMiddleware, loginMiddleware]
import ../allUrlParams
import diaryEntryControllers
import diaryEntryModel
import diaryEntryService
import ../genericArticleControllers
import std/strformat

proc addDiaryEntryRoutes*(app: Prologue) =
    app.addRoute(
        re"/diaryentry/",
        handler = createEntryCreationHandler(DiaryEntry, getSerializedDiaryEntry),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(DiaryEntry, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{ID_PATTERN}/",
        handler = createEntryUpdateHandler(DiaryEntry, ID_PARAM, getSerializedDiaryEntry),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignDiaryEntryListOverview),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/{SESSION_NUMBER_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/{USERNAME_PATTERN}/", 
        handler = getDairyEntryController,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
