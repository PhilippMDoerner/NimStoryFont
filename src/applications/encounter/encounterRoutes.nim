import prologue
import ../../middleware/[loginMiddleware]
import encounterControllers
import std/strformat
import encounterService
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
        handler = createSimpleHandler(CreateParams, createEncounter),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/{ID_PATTERN}/", 
        handler = createSimpleDeletionHandler(DeleteParams, deleteEncounter),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{ID_PATTERN}/",
        handler = createSimpleHandler(ReadByIdParams, getEncounterById),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/{ID_PATTERN}/", 
        handler = createSimpleHandler(UpdateParams, updateEncounter),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )
   
    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/cutinsert/",
        handler = encounterControllers.cutInsertEncounter,
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )
