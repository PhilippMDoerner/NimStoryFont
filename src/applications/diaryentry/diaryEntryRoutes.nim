import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import diaryEntryControllers
import std/strformat

proc addDiaryEntryRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/overview/", 
        diaryEntryControllers.getCampaignDiaryEntryOverviewView,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
