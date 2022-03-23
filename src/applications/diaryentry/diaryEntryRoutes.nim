import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import diaryEntryControllers
import diaryEntryModel
import diaryEntryService
import ../genericArticleControllers
import std/strformat

proc addDiaryEntryRoutes*(app: Prologue) =
    app.addRoute(
        re"/diaryentry/",
        handler = createEntryCreationHandler(DiaryEntry, getDiaryEntryById),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(DiaryEntry, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = getCampaignDiaryEntryOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
