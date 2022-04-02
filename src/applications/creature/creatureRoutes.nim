import prologue
import ../../middleware/[loginMiddleware]
import creatureService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers

proc addCreatureRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/",
        handler = createSimpleHandler(CreateParams, createCreature),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        handler = createSimpleDeletionHandler(DeleteParams, deleteCreature),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        handler = createSimpleHandler(UpdateParams, updateCreature),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{ID_PATTERN}/", 
        handler = createSimpleHandler(ReadByIdParams, getCreatureById),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createSimpleHandler(ReadListParams, getCreatureList),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/creature/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createSimpleHandler(ReadByNameParams, getCreatureByName),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
