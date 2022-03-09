import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import encounterControllers
import std/strformat
import ../urlParamRegexPatterns

proc addEncounterRoutes*(app: Prologue) =
    app.addRoute(
       re"/encounter/{CAMPAIGN_NAME_PATTERN}/orderswap/",
       handler = encounterControllers.swapEncounterOrder,
       httpMethod = HttpPatch,
       middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/{CAMPAIGN_NAME_PATTERN}/",
        handler = encounterControllers.createEncounterView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/{CAMPAIGN_NAME_PATTERN}/{ID_PATTERN}/", 
        handler = encounterControllers.deleteEncounterView,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/{CAMPAIGN_NAME_PATTERN}/{ID_PATTERN}/", 
        handler = encounterControllers.updateEncounterView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )
   
    app.addRoute(
        re"/encounter/{CAMPAIGN_NAME_PATTERN}/cutinsert/",
        handler = encounterControllers.cutInsertEncounter,
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )
