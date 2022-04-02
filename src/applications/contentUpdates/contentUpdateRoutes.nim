import prologue
import ../../middleware/[loginMiddleware]
import contentUpdateControllers
import std/strformat
import ../allUrlParams

proc addArticleUpdateRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/recentUpdates/{CAMPAIGN_NAME_PATTERN}/",
        handler = contentUpdateControllers.getRecentlyUpdatedArticles,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/recentUpdates/{CAMPAIGN_NAME_PATTERN}/{PAGE_NUMBER_PATTERN}/",
        handler = contentUpdateControllers.getRecentlyUpdatedArticles,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
