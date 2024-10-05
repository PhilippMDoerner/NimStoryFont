import std/[strformat]
import prologue
import campaignControllers
import campaignService
import campaignSerialization
import campaignUtils
import ../allUrlParams
import ../genericArticleControllers
import ../../middleware/[loginMiddleware]



proc addCampaignRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/campaign/{CAMPAIGN_NAME_PATTERN}/members/",
        handler = changeMembership,
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/campaign/",
        handler = createCampaignController,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/campaign/pk/{ID_PATTERN}/", 
        handler = deactivateCampaignController,
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/campaign/pk/{ID_PATTERN}/", 
        handler = updateCampaignController,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/campaign/pk/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, Campaign, CampaignSerializable](serializeCampaign),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/campaign/overview/", 
        handler = createReadListHandler(
          getAllCampaignOverviews,
          noCampaignListPermissionCheck,
          overviewSerialize
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/campaign/", 
        handler = createReadListHandler(
          getAllCampaignReads,
          noCampaignListPermissionCheck,
          serializeCampaignReads
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/campaign/{CAMPAIGN_NAME_PATTERN}/", 
        handler = createReadHandler[CampaignNameParams, CampaignRead, CampaignSerializable](
          readCampaignByName,
          checkAdminPermission,
          serializeCampaignRead
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/admin/statistics/{CAMPAIGN_NAME_PATTERN}",
        handler = getCampaignStatistics,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/admin/statistics",
        handler = getWikiStatistics,
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    
    app.addRoute(
        "/emptysearchresponse",
        handler = createCreateHandler[CreateParams, EmptySearchResponse, CampaignSerializable](
            checkCampaignAdminPermission,
            createEntry,
            serializeEmptySearchResponse
        ),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/emptysearchresponse/pk/{ID_PATTERN}/",
        handler = createDeleteHandler[DeleteParams, EmptySearchResponse](
            readArticleById,
            checkCampaignAdminPermission,
            deleteArticle
        ),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )