import campaignService
import campaignUtils
import campaignSerialization
import prologue
import jsony
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import ../allUrlParams
import ../user/userService
import std/[strformat, strutils, sequtils, sugar, options]
import ../authentication/[authenticationUtils, authenticationService, authenticationConstants]
import ../genericArticleRepository
import statisticsService

type RequestedUser = object
  pk: int64

type ChangeMembershipRequestBody = object
  action: string
  user: RequestedUser

type MembershipAction = enum
  ADD="add", REMOVE="remove"

proc changeMembership*(ctx: Context) {.async, gcsafe.} = 
  let ctx = JWTContext(ctx)
  
  let campaignName: string = ctx.getPathParamsOption(CAMPAIGN_NAME_PARAM).get()
  let changeRequestParams = ctx.request.body().fromJson(ChangeMembershipRequestBody)

  let actionStr = changeRequestParams.action.split("_")[0]
  let action = parseEnum[MembershipAction](actionStr)
  let roleStr = changeRequestParams.action.split("_")[1]
  let role = parseEnum[CampaignRole](roleStr)

  respondOnError():
    withDbTransaction(connection):
      let campaign: CampaignRead = connection.getEntryByField("name", campaignName, CampaignRead)
      checkCampaignMembershipChangePermission(ctx, campaign.id)

      var selectedUser: User = connection.getEntryById(changeRequestParams.user.pk, User)
      
      case action:
      of MembershipAction.ADD:
        connection.addCampaignMember(campaign, role, selectedUser)
      of MembershipAction.REMOVE:
        connection.removeCampaignMember(campaign, role, selectedUser)
      
      let campaignMemberships: seq[UserGroup] = connection.getCampaignMembersWithRole(campaign, role)
      let data = campaignMemberships.map(membership => connection.serializeMembership(membership))
      
      resp jsonyResponse(ctx, data)



proc deactivateCampaignController*(ctx: Context) {.async, gcsafe.} = 
  let ctx = JWTContext(ctx)
  
  let campaignId: int64 = ctx.getPathParamsOption(ID_PARAM).get().parseInt().int64

  respondOnError():
    withDbTransaction(connection):
      var campaign: Campaign = connection.getEntryById(campaignId, Campaign)
      checkAdminPermission(ctx, campaign)
      connection.deactivateCampaign(campaign)

      respDefault(Http204)


proc getCampaignStatistics*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  let campaignName: string = ctx.getPathParamsOption(CAMPAIGN_NAME_PARAM).get()

  respondOnError():
    withDbConn(connection):
      let statistics: Statistics = connection.getCampaignStatistics(campaignName)
      resp jsonyResponse(ctx, statistics)
    

proc getWikiStatistics*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  respondOnError():
    withDbConn(connection):
      let statistics: Statistics = connection.getWikiStatistics()
      resp jsonyResponse(ctx, statistics)