import prologue
import ../../middleware/loginMiddleware
import locationControllers
import locationService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers

proc addLocationRoutes*(app: Prologue) =
    app.addRoute(
        re"/location/",
        handler = createEntryCreationHandler(Location, getLocationSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/location/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Location, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/location/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Location, ID_PARAM, getLocationSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/location/{ID_PATTERN}/", 
        handler = createEntryReadByIdHandler(ID_PARAM, getLocationById), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/location/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignLocationList),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/location/{CAMPAIGN_NAME_PATTERN}/{PARENT_LOCATION_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/",
        handler = locationControllers.getLocationByNameView,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
