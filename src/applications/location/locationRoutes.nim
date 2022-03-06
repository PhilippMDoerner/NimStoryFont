import prologue
import ../../middleware/loginMiddleware
import locationControllers
import std/strformat
import ../urlParamRegexPatterns

proc addLocationRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/location/{CAMPAIGN_NAME}/{PARENT_LOCATION_NAME}/{ARTICLE_NAME}/",
        handler = locationControllers.getLocationByNameView,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
