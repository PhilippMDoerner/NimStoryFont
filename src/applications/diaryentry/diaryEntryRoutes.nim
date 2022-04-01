import prologue
import ../../middleware/[campaignAccessMiddleware, loginMiddleware]
import ../allUrlParams
import diaryEntryModel
import diaryEntryService
import ../genericArticleControllers
import std/strformat

proc addDiaryEntryRoutes*(app: Prologue) =
    app.addRoute(
        re"/diaryentry/",
        handler = createSimpleHandler(CreateParams, createDiaryEntry),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{ID_PATTERN}/", 
        handler = createSimpleDeletionHandler(DeleteParams, deleteDiaryEntry),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{ID_PATTERN}/",
        handler = createSimpleHandler(UpdateParams, updateDiaryEntry),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createSimpleHandler(ReadListParams, getDiaryEntryList),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/{SESSION_NUMBER_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/{USERNAME_PATTERN}/", 
        handler = createSimpleHandler(ReadDiaryEntryParams, getDiaryEntry),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
