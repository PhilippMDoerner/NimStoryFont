import prologue
import ../../middleware/loginMiddleware
import searchControllers

proc addSearchRoutes*(app: Prologue) =
    app.addRoute(
        re"/search/(?P<campaignName>[^/]+)/(?P<searchText>[^/]+)/",
        handler = searchControllers.findArticles,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
