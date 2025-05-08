import prologue
import ../../middleware/[loginMiddleware]
import encounterControllers
import std/strformat
import encounterService
import encounterSerialization
import encounterUtils
import ../allUrlParams
import ../genericArticleControllers

proc addEncounterRoutes*(app: Prologue) =
  app.addRoute(
    re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/orderswap/",
    handler = encounterControllers.swapEncounterOrder,
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/encounter/",
    handler = encounterControllers.createEncounterInDiaryentry,
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/encounter/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, Encounter](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/encounter/pk/{ID_PATTERN}/",
    handler = createReadByIdHandler[
      ReadByIdParams, EncounterRead, EncounterSerializable
    ](serializeEncounterRead),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/encounter/pk/{ID_PATTERN}/",
    handler = createUpdateByIdHandler[UpdateParams, Encounter, EncounterSerializable](
      serializeEncounter
    ),
    httpMethod = HttpPut,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/cutinsert/",
    handler = encounterControllers.cutInsertEncounter,
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/overview/",
    handler = createReadListHandler(
      readCampaignEncounters, checkEncounterListPermission, overviewSerialize
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
