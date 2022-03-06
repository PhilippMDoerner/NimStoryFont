import prologue
import ../../middleware/loginMiddleware
import searchControllers
import std/strformat
import ../urlParamRegexPatterns

proc addSearchRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/search/{CAMPAIGN_NAME}/{SEARCH_TEXT}/",
        handler = searchControllers.findArticles,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
