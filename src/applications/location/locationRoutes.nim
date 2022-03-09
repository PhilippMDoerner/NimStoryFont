import prologue
import ../../middleware/loginMiddleware
import locationControllers
import std/strformat
import ../urlParamRegexPatterns

proc addLocationRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/location/{CAMPAIGN_NAME_PATTERN}/{PARENT_LOCATION_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/",
        handler = locationControllers.getLocationByNameView,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
