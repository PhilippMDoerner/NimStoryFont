import std/strformat
import prologue
import ./nodeMapControllers
import ./nodeMapSerialization
import ./nodeMapService
import ./nodeMapModel
import ../allUrlParams
import ../genericArticleControllers
import ../../middleware/[loginMiddleware]


proc addNodeMapRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/nodeMap/{CAMPAIGN_NAME_PATTERN}/",
        handler = fetchNodeMap,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationship/",
        handler = createCreateArticleHandler[CreateParams, CustomLink, Link](
            serializeCustomLink
        ),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/relationship/pk/{ID_PATTERN}/",
        handler = createDeleteByIdHandler[DeleteParams, CustomLink](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationship/pk/{ID_PATTERN}/",
        handler = createUpdateByIdHandler[UpdateParams, CustomLink, Link](
            serializeCustomLink
        ),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationship/pk/{ID_PATTERN}/",
        handler = createPatchByIdHandler[UpdateParams, CustomLink, Link](
            serializeCustomLink
        ),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationship/{CAMPAIGN_NAME_PATTERN}/overview",
        handler = createReadCampaignListHandler[ReadListParams, CustomLink, CustomLink](
            noSerialization
        ),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/relationshiptype/",
        handler = createCreateArticleHandler[CreateParams, CustomLinkType, CustomLinkType](
            noSerialization
        ),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationshiptype/pk/{ID_PATTERN}/",
        handler = createDeleteByIdHandler[DeleteParams, CustomLinkType](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationshiptype/pk/{ID_PATTERN}/",
        handler = createUpdateByIdHandler[UpdateParams, CustomLinkType, CustomLinkType](
            noSerialization
        ),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationshiptype/pk/{ID_PATTERN}/",
        handler = createPatchByIdHandler[UpdateParams, CustomLinkType, CustomLinkType](
            noSerialization
        ),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationshiptype/{CAMPAIGN_NAME_PATTERN}/overview/",
        handler = createReadListHandler[ReadListParams, CustomLinkType, CustomLinkType](
            readListProc = getCampaignLinkTypes,
            checkPermission = checkNoPermission[CustomLinkType],
            serialize = noSerialization
        ),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/relationshiptype/",
        handler = createReadListHandler[ReadListParams, CustomLinkType, CustomLinkType](
            readListProc = getLinkTypes,
            checkPermission = checkNoPermission[CustomLinkType],
            serialize = noSerialization
        ),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    