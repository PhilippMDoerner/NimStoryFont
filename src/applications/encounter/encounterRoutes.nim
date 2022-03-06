import prologue
import ../../middleware/[loginMiddleware, campaignAccessMiddleware]
import encounterControllers
import std/strformat
import ../urlParamRegexPatterns

proc addEncounterRoutes*(app: Prologue) =
    app.addRoute(
       re"/encounter/{CAMPAIGN_NAME}/orderswap/",
       handler = encounterControllers.swapEncounterOrder,
       httpMethod = HttpPatch,
       middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/{CAMPAIGN_NAME}/",
        handler = encounterControllers.createEncounterView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/{CAMPAIGN_NAME}/{ID}/", 
        handler = encounterControllers.deleteEncounterView,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )

    app.addRoute(
        re"/encounter/{CAMPAIGN_NAME}/{ID}/", 
        handler = encounterControllers.updateEncounterView,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )
   
    app.addRoute(
        re"/encounter/{CAMPAIGN_NAME}/cutinsert/",
        handler = encounterControllers.cutInsertEncounter,
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware(), campaignMemberAccessMiddleware()]
    )
