import organizationModel
import ../genericArticleRepository
import ../authentication/authenticationUtils
import ../../utils/jwtContext

proc `$`*(model: OrganizationRead | Organization | OrganizationOverview): string =
    result = model.name

proc campaign_id*(entry: OrganizationRelationship): int64 =
    result = getEntryById(entry.organization_id, Organization).campaign_id

proc checkOrganizationRelationshipCreatePermission*(ctx: JWTContext, entry: OrganizationRelationship) =
  let organization: Organization = getEntryById(entry.organization_id, Organization)
  checkCreatePermission(ctx, organization.campaign_id)