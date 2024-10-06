import std/[strutils, sequtils, sugar, options]
import prologue
import jsony
import ./campaignService
import ./campaignUtils
import ./campaignSerialization
import ./campaignDTO
import ./statisticsService
import ../controllerTemplates
import ../allUrlParams
import ../user/userService
import ../authentication/[authenticationUtils, authenticationService, authenticationConstants]
import ../genericArticleRepository
import ../genericArticleControllers
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../database
import ../../applicationSettings

type RequestedUser = object
  pk: int64

type ChangeMembershipRequestBody = object
  action: string
  user: RequestedUser

type MembershipAction = enum
  ADD="add", REMOVE="remove"

proc createCampaignController*(ctx: Context) {.async, gcsafe.} =
  let ctx = JWTContext(ctx)
  ctx.checkAdminPermission(Campaign())
  
  let backgroundImage = ctx.extractFormFile("background_image")
  let icon = ctx.extractFormFile("icon")
  
  let hasImages = backgroundImage.isSome() and icon.isSome()
  if not hasImages:
    resp get400BadRequestResponse()
    
  respondOnError():
    let campaignFormData = CampaignDTO(
      name: ctx.getFormParamsOption("name").get(),
      subtitle: ctx.getFormParamsOption("subtitle"),
      backgroundImage: ctx.extractFormFile("background_image").get(),
      icon: ctx.extractFormFile("icon").get(),
      mediaDirectory: ctx.getSetting(SettingName.snImageDir).getStr()
    )
  
    withDbConn(connection):
      let newCampaign: CampaignRead = connection.createCampaign(campaignFormData)
      let campaignSerializable: CampaignSerializable = connection.serializeCampaignRead(newCampaign)
      resp jsonyResponse(ctx, campaignSerializable)

proc updateCampaignController*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  let campaignId = ctx.getPathParamsOption(ID_PARAM).get().parseInt().int64
  checkCampaignAdminPermission(ctx, campaignId)

  let backgroundImage = ctx.extractFormFile("background_image")
  let icon = ctx.extractFormFile("icon")
  
  respondOnError():
    let updateDatetime: string = ctx.getFormParamsOption("update_datetime").get()
    let userTimestamp = updateDatetime.parseDefault().toTime().toUnix()

    let campaignFormData = CampaignUpdateDTO(
      pk: campaignId,
      name: ctx.getFormParamsOption("name"),
      subtitle: ctx.getFormParamsOption("subtitle"),
      backgroundImage: ctx.extractFormFile("background_image"),
      icon: ctx.extractFormFile("icon"),
      mediaDirectory: ctx.getSetting(SettingName.snImageDir).getStr(),
      userTimestamp: userTimestamp
    )
    
    withDbTransaction(connection):
      try:
        let newCampaign: CampaignRead = connection.updateCampaign(campaignFormData)
        let campaignSerializable: CampaignSerializable = connection.serializeCampaignRead(newCampaign)
        resp jsonyResponse(ctx, campaignSerializable)
      except OutdatedDataError:
        let oldEntry = connection.getEntryById(campaignId, CampaignRead)
        resp outdatedUpdateResponse(ctx, oldEntry)

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
      checkCampaignAdminPermission(ctx, campaign.id)

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