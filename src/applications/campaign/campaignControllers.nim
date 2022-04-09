import campaignService
import campaignUtils
import campaignSerialization
import prologue
import jsony
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import ../allUrlParams
import ../user/userService
import std/[strformat, strutils, sequtils, sugar]
import ../authentication/authenticationConstants
import ../genericArticleRepository

type RequestedUser = object
  pk: int64

type ChangeMembershipRequestBody = object
  action: string
  user: RequestedUser

type MembershipAction = enum
  ADD="add", REMOVE="remove"

proc changeMembership*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParamsOption(CAMPAIGN_NAME_PARAM).get()
    let changeRequestParams = ctx.request.body().fromJson(ChangeMembershipRequestBody)

    let actionStr = changeRequestParams.action.split("_")[0]
    let action = parseEnum[MembershipAction](actionStr)
    let roleStr = changeRequestParams.action.split("_")[1]
    let role = parseEnum[CampaignRole](roleStr)

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        let campaign: CampaignRead = connection.getEntryByField("name", campaignName, CampaignRead)
        checkCampaignMembershipChangePermission(ctx, campaign.id)

        var selectedUser: User = connection.getEntryById(changeRequestParams.user.pk, User)
        
        case action:
        of MembershipAction.ADD:
          connection.addCampaignMember(campaign, role, selectedUser)
        of MembershipAction.REMOVE:
          connection.removeCampaignMember(campaign, role, selectedUser)
        
        let campaignMemberships: seq[UserGroup] = connection.getCampaignMembers(campaign)
        let data = campaignMemberships.map(membership => connection.serializeMembership(membership))
        
        resp jsonyResponse(ctx, data)
