import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import encounterControllers
import std/strformat
import encounterService
import ../allUrlParams
import encounterModel
import ../genericArticleControllers

proc addEncounterRoutes*(app: Prologue) =
    app.addRoute(
       re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/orderswap/",
       handler = encounterControllers.swapEncounterOrder,
       httpMethod = HttpPatch,
       middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/",
        handler = createEntryCreationHandler(Encounter, getSerializedEncounter),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Encounter, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Encounter, ID_PARAM, getSerializedEncounter),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )
   
    app.addRoute(
        re fmt"/encounter/{CAMPAIGN_NAME_PATTERN}/cutinsert/",
        handler = encounterControllers.cutInsertEncounter,
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )
