import prologue
import ../../middleware/loginMiddleware
import locationControllers

proc addLocationRoutes*(app: Prologue) =
    app.addRoute(
        re"/location/(?P<campaignName>[^/]+)/(?P<parentLocationName>[^/]+)/(?P<locationName>[^/]+)/",
        handler = locationControllers.getLocationByNameView,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
