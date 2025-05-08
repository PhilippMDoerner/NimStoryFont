import std/[strformat]
import norm/[sqlite]
import ./nodeMapModel
import ../genericRawRepository
import ../../applicationSettings
import ../../utils/djangoDateTime/[normConversion]

proc getNodes*(con: DbConn, campaignId: int64): seq[Node] =
  const getNodesSQLStatement: string = fmt """
    SELECT record, guid
    FROM {SEARCH_TABLE}
    WHERE 
      campaign_id = ? AND
      table_name IN (
        "wikientries_character", 
        "wikientries_organization", 
        "wikientries_item",
        "wikientries_location"
      )
  """

  let queryParams: array[1, DbValue] = [campaignId.dbValue()]
  return con.rawSelectRows(getNodesSQLStatement, Node, queryParams)

proc getLinks*(
    con: DbConn,
    campaignId: int64,
    itemOwnershipWeight: int64 = 1,
    organizationMembershipWeight: int64 = 1,
    organizationHeadquarterWeight: int64 = 1,
    locationPlacementWeight: int64 = 1,
    sublocationWeight: int64 = 1,
    suborganizationWeight: int64 = 1,
): seq[Link] =
  const getLinksSQLStatement: string = fmt """
    SELECT 
      NULL as id,
      "wikientries_character_" || membership.member_id AS sourceGuid,
      "wikientries_organization_" || membership.organization_id AS targetGuid,
      IFNULL(membership.role, "member of") AS label,
      ? as weight,
      default_relationship_type.color AS color,
      default_relationship_type.icon AS icon,
      "organizationMembership" AS linkKind
    FROM wikientries_organization_member AS membership
    INNER JOIN wikientries_organization AS org ON membership.organization_id = org.id
    CROSS JOIN wikientries_relationship_type AS default_relationship_type
    WHERE 
      org.campaign_id = ? AND 
      default_relationship_type.id = 1

    UNION

    SELECT 
      NULL as id,
      "wikientries_character_" || item.owner_id as sourceGuid,
      "wikientries_item_" || item.id as targetGuid,
      "owns" AS label,
      ? AS weight,
      default_relationship_type.color AS color,
      default_relationship_type.icon AS icon,
      "itemOwnership" AS linkKind
    FROM wikientries_item AS item
    CROSS JOIN wikientries_relationship_type AS default_relationship_type
    WHERE 
      item.campaign_id = ? AND
      item.owner_id IS NOT NULL AND
      default_relationship_type.id = 1
      
    UNION 
    
    SELECT 
      NULL as id,
      "wikientries_character_" || c.id AS sourceGuid,
      "wikientries_location_" || c.current_location_id AS targetGuid,
      "last seen in" AS label,
      ? as weight,
      default_relationship_type.color AS color,
      default_relationship_type.icon AS icon,
      "characterLocation" AS linkKind
    FROM wikientries_character AS c
    CROSS JOIN wikientries_relationship_type AS default_relationship_type    
    WHERE 
      c.campaign_id = ? AND
      c.current_location_id IS NOT NULL AND
      default_relationship_type.id = 1

    UNION
    
    SELECT 
      NULL as id,
      "wikientries_location_" || loc.id AS sourceGuid,
      "wikientries_location_" || loc.parent_location_id AS targetGuid,
      "located in" AS label,
      ? as weight,
      default_relationship_type.color AS color,
      default_relationship_type.icon AS icon,
      "sublocation" as linkKind
    FROM wikientries_location AS loc
    CROSS JOIN wikientries_relationship_type AS default_relationship_type    
    WHERE 
      loc.parent_location_id IS NOT NULL AND
      loc.campaign_id = ? AND
      default_relationship_type.id = 1
      
    UNION
    
    SELECT 
      NULL as id,
      "wikientries_organization_" || org.id AS sourceGuid,
      "wikientries_location_" || org.headquarter_id AS targetGuid,
      "has headquarters in" AS label,
      ? as weight,
      default_relationship_type.color AS color,
      default_relationship_type.icon AS icon,
      "organizationHeadquarter" AS linkKind
    FROM wikientries_organization AS org
    CROSS JOIN wikientries_relationship_type AS default_relationship_type
    WHERE 
      org.campaign_id = ? AND 
      org.headquarter_id IS NOT NULL AND
      default_relationship_type.id = 1
    
    UNION
    
    SELECT
      relationship.id AS id,
      relationship.sourceGuid AS sourceGuid,
      relationship.targetGuid AS targetGuid,
      relationship.label AS label,
      IFNULL(relationship.weight, typ.weight) AS weight,
      typ.color AS color,
      typ.icon AS icon,
      typ.name AS linkKind
    FROM wikientries_relationships AS relationship
    INNER JOIN wikientries_relationship_type AS typ ON typ.id = relationship.link_type_id
    WHERE 
      relationship.campaign_id = ?
  """

  let queryParams: array[11, DbValue] = [
    # Organization - Character Links
    organizationMembershipWeight.dbValue(),
    campaignId.dbValue(),
    # Item - Character Links
    itemOwnershipWeight.dbValue(),
    campaignId.dbValue(),
    # Location - Character Links
    locationPlacementWeight.dbValue(),
    campaignId.dbValue(),
    # Location - Location Links
    sublocationWeight.dbValue(),
    campaignId.dbValue(),
    # Organization - Location Links
    organizationHeadquarterWeight.dbValue(),
    campaignId.dbValue(),
    # Custom Links
    campaignId.dbValue(),
  ]

  return con.rawSelectRows(getLinksSQLStatement, Link, queryParams)

proc getLinkTypes*(con: DbConn, campaignName: string): seq[CustomLinkType] =
  const getLinkTypesSQL: string = fmt """
    SELECT 
      typ.name,
      typ.icon,
      typ.color,
      typ.weight,
      typ.campaign_id,
      typ.creation_datetime,
      typ.update_datetime,
      typ.id
    FROM {RELATIONSHIP_KIND_TABLE} AS typ
    LEFT JOIN wikientries_campaign AS camp ON camp.id = typ.campaign_id
    WHERE 
      camp.name = ? OR typ.campaign_id IS NULL
  """

  let queryParams: array[1, DbValue] = [campaignName.dbValue()]
  return con.rawSelectRows(getLinkTypesSQL, CustomLinkType, queryParams)
