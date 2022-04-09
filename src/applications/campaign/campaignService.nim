import ../genericArticleRepository
import campaignModel
import campaignRepository
import campaignUtils
import norm/[sqlite, model]
import std/[options, sets]
import tinypool
import ../authentication/authenticationConstants
import ../authentication/authenticationModels
import ../user/userModel

export campaignModel


proc getCampaignByName*(campaignName: string): Campaign =
  result = getEntryByField("name", campaignName, Campaign)


proc getAllCampaigns*(): seq[Campaign] =
  result = getList(Campaign)


proc getAllCampaignReads*(): seq[CampaignRead] = 
  result = getList(CampaignRead)


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