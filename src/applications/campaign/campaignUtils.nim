import campaignModel
import std/[options, strformat, tables]
import ../authentication/authenticationConstants
import ../authentication/authenticationModels
import ../authentication/authenticationUtils
import ../../utils/jwtContext

proc `$`*(model: CampaignOverview | MinimumCampaignOverview | CampaignRead | Campaign): string = 
  result = model.name

proc guestPermissionName*(instance: Campaign): string = fmt "Is {instance.name} guest"
proc memberPermissionName*(instance: Campaign): string = fmt "Is {instance.name} campaign member"
proc adminPermissionName*(instance: Campaign): string = fmt "Is {instance.name} admin"  

proc guestPermissionCodename*(instance: Campaign): string = fmt "{instance.name}_read_campaign_permission"
proc memberPermissionCodename*(instance: Campaign): string = "add_change_delete_{instance.name}_campaign_permission" 
proc adminPermissionCodename*(instance: Campaign): string = "admin_{instance.name}_campaign_permission"

proc guestGroupName*(instance: Campaign): string = "{instance.name}_guest_campaign_group"
proc memberGroupName*(instance: Campaign): string = "{instance.name}_campaign_group" 
proc adminGroupName*(instance: Campaign): string = "{instance.name}_campaign_admin_group" 

proc getCampaignGroupForRole*(instance: CampaignRead, role: CampaignRole): Group =
  result = case role:
    of CampaignRole.crGUEST:
      instance.guest_group_id.get()
    of CampaignRole.crMEMBER:
      instance.member_group_id.get()
    of CampaignRole.crADMIN:
      instance.admin_group_id.get()

proc getCampaignGroupIdForRole*(instance: Campaign, role: CampaignRole): int64 =
  result = case role:
    of CampaignRole.crGUEST:
      instance.guest_group_id.get()
    of CampaignRole.crMEMBER:
      instance.member_group_id.get()
    of CampaignRole.crADMIN:
      instance.admin_group_id.get()

proc getCampaignGroupIdForRole*(instance: CampaignRead, role: CampaignRole): int64 =
  result = case role:
    of CampaignRole.crGUEST:
      instance.guest_group_id.get().id
    of CampaignRole.crMEMBER:
      instance.member_group_id.get().id
    of CampaignRole.crADMIN:
      instance.admin_group_id.get().id


proc checkCampaignMembershipChangePermission*(ctx: JWTContext, campaignId: int64) =
  if ctx.tokenData.isAdmin or ctx.tokenData.isSuperUser:
    return

  let userRole: CampaignAccessLevel = ctx.tokenData.campaignMemberships[campaignId]
  if not (userRole == CampaignAccessLevel.ADMIN):
    raise newException(CampaignPermissionError, "Only admins of a campaign can add/remove members from it")


proc noCampaignListPermissionCheck*(ctx: JWTContext, entries: seq[CampaignRead]) = 
  return