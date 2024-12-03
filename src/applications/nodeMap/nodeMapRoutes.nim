import std/strformat
import prologue
import ./nodeMapControllers
import ../allUrlParams
import ../../middleware/[loginMiddleware]


proc addNodeMapRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/nodeMap/{CAMPAIGN_NAME_PATTERN}/",
        handler = fetchNodeMap,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

