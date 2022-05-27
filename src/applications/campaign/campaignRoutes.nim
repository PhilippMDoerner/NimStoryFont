import prologue
import ../../middleware/[loginMiddleware]
import campaignControllers
import campaignService
import campaignSerialization
import campaignUtils
import std/strformat
import ../allUrlParams
import ../genericArticleControllers



proc addCampaignRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/campaign/{CAMPAIGN_NAME_PATTERN}/members/",
        handler = changeMembership,
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/campaign/",
        handler = createCreateArticleHandler[CreateParams, Campaign, CampaignSerializable](serializeCampaign),
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
        handler = createUpdateByIdHandler[UpdateParams, Campaign, CampaignSerializable](serializeCampaign),
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
          serializeCampaignRead
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
    
   
