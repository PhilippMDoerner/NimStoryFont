import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import organizationModel
import organizationSerialization
import organizationService
import std/strformat
import ../genericArticleControllers

proc addOrganizationRoutes*(app: Prologue) =
    app.addRoute(
        re"/organization/",
        handler = createCreateArticleHandler[CreateParams, Organization, OrganizationSerializable](serializeOrganization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Organization](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Organization, OrganizationSerializable](serializeOrganization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, OrganizationRead, OrganizationSerializable](serializeOrganizationRead), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, OrganizationOverview, OrganizationOverviewSerializable](overviewSerialize),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/organization/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadByNameHandler[ReadByNameParams, OrganizationRead, OrganizationSerializable](serializeOrganizationRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
