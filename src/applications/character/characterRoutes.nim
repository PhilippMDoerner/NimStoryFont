import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import characterModel
import characterService
import std/strformat
import ../genericArticleControllers

proc addCharacterRoutes*(app: Prologue) =
    app.addRoute(
        re"/character/",
        handler = createSimpleHandler(CreateParams, createCharacter),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID_PATTERN}/", 
        handler = createSimpleDeletionHandler(DeleteParams, deleteCharacter),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID_PATTERN}/", 
        handler = createSimpleHandler(UpdateParams, updateCharacter),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{ID_PATTERN}/", 
        handler = createSimpleHandler(ReadByIdParams, getCharacterById), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createSimpleHandler(ReadListParams, getCharacterList),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createSimpleHandler(ReadByNameParams, getCharacterByName),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
