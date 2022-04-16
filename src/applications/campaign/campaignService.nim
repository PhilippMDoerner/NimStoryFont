import ../genericArticleRepository
import ../genericArticleService
import campaignModel
import campaignRepository
import campaignUtils
import norm/[sqlite, model]
import std/[options, sets, tables, strformat]
import tinypool
import ../authentication/authenticationConstants
import ../authentication/authenticationModels
import ../user/userModel
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

proc readCampaignByName*(connection: DbConn, requestParams: CampaignNameParams): CampaignRead =
  result = connection.getEntryByField("name", requestParams.campaignName, CampaignRead)

proc getAllCampaignOverviews*(connection: DbConn, requestParams: ReadWithoutParams): seq[CampaignRead] =
  var memberships: seq[int64] = @[]
  for campaignId in requestParams.userToken.campaignMemberships.keys:
    memberships.add(campaignId)

  result = connection.getCampaigns(memberships)

proc getCampaignMembers*(connection: DbConn, campaign: Campaign | CampaignRead): seq[UserGroup] =
  result = connection.readCampaignMembers(campaign)

proc addCampaignMember*(connection: DbConn, campaign: CampaignRead, role: CampaignRole, newMember: var User) =
  let campaignGroup: Group = getCampaignGroupForRole(campaign, role)
  var newMembership = UserGroup(user_Id: newMember, group_id: campaignGroup)
  discard connection.createEntryInTransaction(newMembership)

proc removeCampaignMember*(connection: DbConn, campaign: CampaignRead, role: CampaignRole, newMember: var User) =
  let campaignGroup: Group = getCampaignGroupForRole(campaign, role)
  var membershipToRemove = UserGroup(user_Id: newMember, group_id: campaignGroup)
  connection.deleteEntryInTransaction(membershipToRemove)


proc deactivateCampaign*(connection: DbConn, campaign: var Campaign) =
  if campaign.is_deactivated:
    raise newException(InvalidDatabaseManipulation, fmt"Campaigns cannot be deleted, they only get deactivated. '{campaign.name}' is already deactivated.")
  
  campaign.is_deactivated = true
  discard connection.updateEntryInTransaction(campaign)