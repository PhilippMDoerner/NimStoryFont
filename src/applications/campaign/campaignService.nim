import ../genericArticleRepository
import ../genericArticleService
import campaignModel
import campaignRepository
import norm/[model, sqlite]
import std/[options, sets, tables, strformat, sugar]
import tinypool/sqlitePool except DbConn
import ../authentication/authenticationConstants
import ../authentication/authenticationModels
import ../allUrlParams
import ../../utils/jwtContext
import ../authentication/myJwt

export campaignModel


proc getCampaignByName*(campaignName: string): Campaign =
  result = getEntryByField("name", campaignName, Campaign)


proc getAllCampaigns*(): seq[Campaign] =
  result = getList(Campaign)


proc getAllCampaignReads*(): seq[CampaignRead] = 
  result = getList(CampaignRead)

proc getAllCampaignReads*(connection: DbConn, requestParams: ReadWithoutParams): seq[CampaignRead] =
  result = connection.getList(CampaignRead)

proc readCampaignByName*(connection: DbConn, requestParams: CampaignNameParams): CampaignRead =
  result = connection.getEntryByField("name", requestParams.campaignName, CampaignRead)

proc getAllCampaignOverviews*(connection: DbConn, requestParams: ReadWithoutParams): seq[CampaignRead] =
  var campaignIdsOfUser: seq[int64] = @[]

  if requestParams.userToken.isAdmin or requestParams.userToken.isSuperUser:
    return connection.getList(CampaignRead)

  for campaignIdentifier in requestParams.userToken.campaignMemberships.keys:
    if campaignIdentifier.kind == CampaignIdType.citInt:
      campaignIdsOfUser.add(campaignIdentifier.id)

  result = connection.getCampaigns(campaignIdsOfUser)

proc getCampaignMembers*(connection: DbConn, campaign: Campaign | CampaignRead): seq[UserGroup] =
  result = connection.readCampaignMembers(campaign)

proc getCampaignMembersWithRole*(connection: DbConn, campaign: CampaignRead, role: CampaignRole): seq[UserGroup] =
  let campaignGroup: Option[Group] = case role:
  of CampaignRole.crADMIN:
    campaign.admin_group_id
  of CampaignRole.crMEMBER:
    campaign.member_group_id
  of CampaignRole.crGUEST:
    campaign.guest_group_id

  let campaignGroupId: Option[int64] = campaignGroup.map(group => group.id)
  if campaignGroupId.isNone():
    result = @[]

  result = connection.getList(
    UserGroup, 
    "group_id = ?", 
    campaignGroupId.get().dbValue(), 
  )

proc deactivateCampaign*(connection: DbConn, campaign: var Campaign) =
  if campaign.is_deactivated:
    raise newException(InvalidDatabaseManipulation, fmt"Campaigns cannot be deleted, they only get deactivated. '{campaign.name}' is already deactivated.")
  
  campaign.is_deactivated = true
  discard connection.updateEntryInTransaction(campaign)