import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import organizationControllers
import organizationModel
import organizationService
import std/strformat
import ../genericArticleControllers

proc addOrganizationRoutes*(app: Prologue) =
    app.addRoute(
        re"/organization/",
        handler = createEntryCreationHandler(Organization, getOrganizationSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(Organization, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(Organization, ID_PARAM, getOrganizationSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/{ID_PATTERN}/", 
        handler = createEntryReadByIdHandler(ID_PARAM, getOrganizationById), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignOrganizationList),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/organization/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        getOrganizationByNameController,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
