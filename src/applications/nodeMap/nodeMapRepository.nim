import std/[strformat]
import norm/[sqlite]
import ./nodeMapModel
import ../genericRawRepository
import ../../database
import ../../applicationSettings

proc getNodes*(campaignId: int64): seq[Node] =
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
  withDbConn(connection):
    return connection.rawSelectRows(getNodesSQLStatement, Node, queryParams)

proc getLinks*(
  campaignId: int64, 
  itemOwnershipWeight: int64 = 1, 
  organizationMembershipWeight: int64 = 1,
  organizationHeadquarterWeight: int64 = 1,
  locationPlacementWeight: int64 = 1,
  sublocationWeight: int64 = 1,
  suborganizationWeight: int64 = 1
): seq[Link] =
  const getLinksSQLStatement: string = fmt """
    SELECT 
      NULL as id,
      "wikientries_character_" || membership.member_id AS sourceGuid,
      "wikientries_organization_" || membership.organization_id AS targetGuid,
      IFNULL(membership.role, "member of") AS label,
      ? as weight,
      "organizationMembership" AS linkKind
    FROM wikientries_organization_member AS membership
    INNER JOIN wikientries_organization AS org ON membership.organization_id = org.id
    WHERE campaign_id = ?

    UNION

    SELECT 
      NULL as id,
      "wikientries_character_" || owner_id as sourceGuid,
      "wikientries_item_" || id as targetGuid,
      "owns" AS label,
      ? AS weight,
      "itemOwnership" AS linkKind
    FROM wikientries_item AS item
    WHERE 
      campaign_id = ? AND
      owner_id IS NOT NULL
      
    UNION 
    
    SELECT 
      NULL as id,
      "wikientries_character_" || c.id AS sourceGuid,
      "wikientries_location_" || c.current_location_id AS targetGuid,
      "last seen in" AS label,
      ? as weight,
      "locationPlacement" AS linkKind
    FROM wikientries_character AS c
    WHERE 
      c.campaign_id = ? AND
      c.current_location_id IS NOT NULL
      
    UNION
    
    SELECT 
      NULL as id,
      "wikientries_location_" || id AS sourceGuid,
      "wikientries_location_" || parent_location_id AS targetGuid,
      "located in" AS label,
      ? as weight,
      "sublocation" as linkKind
    FROM wikientries_location
    WHERE 
      parent_location_id IS NOT NULL AND
      campaign_id = ?
      
    UNION
    
    SELECT
      NULL as id,
      "wikientries_organization_" || organization_id as sourceGuid,
      "wikientries_organization_" || parent_organization_id as targetGuid,
      IFNULL(membership.role, "part of") AS label,
      ? as weight,
      "suborganization" as linkKind
    
    UNION
    
    SELECT 
      NULL as id,
      "wikientries_organization_" || org.id AS sourceGuid,
      "wikientries_location_" || org.headquarter_id AS targetGuid,
      "has headquarters in" AS label,
      ? as weight,
      "organizationHeadquarter" AS linkKind
    FROM wikientries_organization AS org
    WHERE campaign_id = ? AND headquarter_id IS NOT NULL
    
    UNION
    
    SELECT
      id,
      sourceGuid,
      targetGuid,
      label,
      weight,
      "custom" as linkKind
      FROM wikientries_relationships
    WHERE campaign_id = ?
  """
  
  let queryParams: array[13, DbValue] = [
    itemOwnershipWeight.dbValue(), 
    campaignId.dbValue(), 
    organizationMembershipWeight.dbValue(), 
    campaignId.dbValue(),
    locationPlacementWeight.dbValue(),
    campaignId.dbValue(),
    sublocationWeight.dbValue(),
    campaignId.dbValue(),
    suborganizationWeight.dbValue(),
    campaignId.dbValue(),
    organizationHeadquarterWeight.dbValue(),
    campaignId.dbValue(),
    campaignId.dbValue()
  ]
    
  withDbConn(connection):
    return connection.rawSelectRows(
      getLinksSQLStatement, 
      Link, 
      queryParams
    )