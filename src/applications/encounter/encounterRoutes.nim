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
       middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/",
        handler = createCreateHandler[CreateParams, Encounter, EncounterSerializable](checkCreatePermission, createEncounter, serializeEncounter),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Encounter](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{ID_PATTERN}/",
        handler = createReadByIdHandler[ReadByIdParams, EncounterRead, EncounterSerializable](serializeEncounterRead),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Encounter, EncounterSerializable](serializeEncounter),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )
   
    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/cutinsert/",
        handler = encounterControllers.cutInsertEncounter,
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )
