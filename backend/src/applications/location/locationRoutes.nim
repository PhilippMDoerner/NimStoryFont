import std/strformat
import prologue
import ./locationService
import ./locationSerialization
import ../../middleware/loginMiddleware
import ../allUrlParams
import ../genericArticleControllers
import ../authentication/authenticationUtils

proc addLocationRoutes*(app: Prologue) =
  app.addRoute(
    re"/location/",
    handler = createCreateArticleHandler[CreateParams, Location, LocationSerializable](
      serializeLocation
    ),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/location/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, Location](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/location/pk/{ID_PATTERN}/",
    handler = createUpdateByIdHandler[UpdateParams, Location, LocationSerializable](
      serializeLocation
    ),
    httpMethod = HttpPut,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/location/pk/{ID_PATTERN}/",
    handler = createPatchByIdHandler[UpdateParams, Location, LocationSerializable](
      serializeLocation
    ),
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/location/pk/{ID_PATTERN}/",
    handler = createReadByIdHandler[ReadByIdParams, LocationRead, LocationSerializable](
      serializeLocationRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/location/{CAMPAIGN_NAME_PATTERN}/overview/",
    handler = createReadCampaignListHandler[
      ReadListParams, LocationRead, LocationOverviewSerializable
    ](overviewSerialize),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/location/{CAMPAIGN_NAME_PATTERN}/{PARENT_LOCATION_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/",
    handler = createReadHandler[
      ReadLocationByNameParams, LocationRead, LocationSerializable
    ](getLocationByName, checkReadPermission, serializeLocationRead),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
