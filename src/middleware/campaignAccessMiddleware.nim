import prologue
import ../utils/jwtContext
import ../utils/errorResponses
import ../applicationSettings
import std/[strutils, options, json]
import ../applications/authentication/[authenticationModels, myJwt]

type InvalidMiddlewareUseDefect* = object of Defect

proc hasGuestAccessLevelOrHigher(userMemberships: Table[string, CampaignAccessLevel], campaignName: string): bool =
  if not userMemberships.hasKey(campaignName):
    return false

  let accessLevel: CampaignAccessLevel = userMemberships[campaignName]
  result = accessLevel == CampaignAccessLevel.GUEST or accessLevel == CampaignAccessLevel.MEMBER or accessLevel == CampaignAccessLevel.ADMIN


proc hasMemberAccessLevelOrHigher(userMemberships: Table[string, CampaignAccessLevel], campaignName: string): bool =
  if not userMemberships.hasKey(campaignName):
    return false

  let accessLevel: CampaignAccessLevel = userMemberships[campaignName]
  result = accessLevel == CampaignAccessLevel.MEMBER or accessLevel == CampaignAccessLevel.ADMIN


proc hasCampaignAdminAccessLevel(userMemberships: Table[string, CampaignAccessLevel], campaignName: string): bool =
  if not userMemberships.hasKey(campaignName):
    return false

  let accessLevel: CampaignAccessLevel = userMemberships[campaignName]
  result = accessLevel == CampaignAccessLevel.ADMIN


proc campaignGuestAccessMiddleware*(): HandlerAsync =
  result = proc(ctx: Context) {.async.} =  
    let ctx = JWTContext(ctx)
    let userCampaignMemberships: Table[string, CampaignAccessLevel] = ctx.tokenData.campaignMemberships

    let campaignUrlParam = ctx.getPathParams("campaignName")
    if campaignUrlParam == "":
      raise newException(InvalidMiddlewareUseDefect, """Tried using campaignGuestAccessMiddleware 
        on a route that has no campaignName url parameter. That parameter is necessary to see which campaign's data
        is being accessed""")
    
    if not hasGuestAccessLevelOrHigher(userCampaignMemberships, campaignUrlParam):
      resp get401UnauthorizedResponse(ctx)
      return

    await switch(ctx)

proc campaignMemberAccessMiddleware*(): HandlerAsync =
  result = proc(ctx: Context) {.async.} =  
    let ctx = JWTContext(ctx)
    let userCampaignMemberships: Table[string, CampaignAccessLevel] = ctx.tokenData.campaignMemberships

    let campaignUrlParam = ctx.getPathParams("campaignName")
    if campaignUrlParam == "":
      raise newException(InvalidMiddlewareUseDefect, """Tried using campaignGuestAccessMiddleware 
        on a route that has no campaignName url parameter. That parameter is necessary to see which campaign's data
        is being accessed""")
    
    if not hasMemberAccessLevelOrHigher(userCampaignMemberships, campaignUrlParam):
      resp get401UnauthorizedResponse(ctx)
      return

proc campaignAdminAccessMiddleware*(): HandlerAsync =
  result = proc(ctx: Context) {.async.} =  
    let ctx = JWTContext(ctx)
    let userCampaignMemberships: Table[string, CampaignAccessLevel] = ctx.tokenData.campaignMemberships

    let campaignUrlParam = ctx.getPathParams("campaignName")
    if campaignUrlParam == "":
      raise newException(InvalidMiddlewareUseDefect, """Tried using campaignGuestAccessMiddleware 
        on a route that has no campaignName url parameter. That parameter is necessary to see which campaign's data
        is being accessed""")
    
    if not hasCampaignAdminAccessLevel(userCampaignMemberships, campaignUrlParam):
      resp get401UnauthorizedResponse(ctx)
      return