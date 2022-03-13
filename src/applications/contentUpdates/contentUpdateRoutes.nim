import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import contentUpdateControllers
import std/strformat
import ../allUrlParams

proc addArticleUpdateRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/recentUpdates/{CAMPAIGN_NAME_PATTERN}/",
        handler = contentUpdateControllers.getRecentlyUpdatedArticles,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/recentUpdates/{CAMPAIGN_NAME_PATTERN}/{PAGE_NUMBER_PATTERN}/",
        handler = contentUpdateControllers.getRecentlyUpdatedArticles,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware(), campaignGuestAccessMiddleware()]
    )
