import prologue
import organizationModel
import organizationSerialization
import organizationService
import organizationUtils
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import ../../middleware/loginMiddleware

proc addOrganizationRoutes*(app: Prologue) =
    app.addRoute(
        re"/organization/",
        handler = createCreateArticleHandler[CreateParams, Organization, OrganizationSerializable](serializeOrganization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Organization](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/pk/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Organization, OrganizationSerializable](serializeOrganization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/pk/{ID_PATTERN}/", 
        handler = createPatchByIdHandler[UpdateParams, Organization, OrganizationSerializable](serializeOrganization),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/organization/pk/{ID_PATTERN}/", 
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
    
    app.addRoute(
        re fmt"/organizationrelationship/",
        handler = createCreateHandler[CreateParams, OrganizationRelationship, OrganizationSerializable](
            checkOrganizationRelationshipCreatePermission,
            createEntry,
            serializeOrganization
        ),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/organizationrelationship/pk/{ID_PATTERN}/",
        handler = createDeleteByIdHandler[DeleteParams, OrganizationRelationship](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/organizationrelationship/pk/{ID_PATTERN}/",
        handler = createUpdateEntryByIdHandler[UpdateParams, OrganizationRelationship, OrganizationSerializable](serializeOrganization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )
