import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import diaryEntryControllers
import diaryEntryModel
import ../genericArticleControllers
import std/strformat

proc addDiaryEntryRoutes*(app: Prologue) =
    app.addRoute(
        re"/diaryentry/",
        handler = diaryEntryControllers.createDiaryEntryView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(DiaryEntry),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/overview/", 
        diaryEntryControllers.getCampaignDiaryEntryOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
