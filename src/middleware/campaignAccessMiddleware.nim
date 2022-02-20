import prologue
import ../utils/jwtContext
import ../utils/errorResponses
import std/[strutils]
import ../applications/authentication/[authenticationModels, myJwt]
import ../applicationSettings

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

proc getUserCampaignMemberships(ctx: JWTContext): Table[string, CampaignAccessLevel] =
  assert(isInitTokenData(ctx.tokenData), """Tried using a campaignAccessMiddleware 
      on a route without using a loginMiddleware beforehand. LoginMiddleware provides the 
      necessary data from the parsed JWT Token for authentication""")

  result = ctx.tokenData.campaignMemberships


proc getCampaignUrlParameter(ctx: JWTContext): string =
  let campaignUrlParam = ctx.getPathParams("campaignName")
  
  assert(campaignUrlParam == "", """Tried using campaignGuestAccessMiddleware 
      on a route that has no campaignName url parameter. That parameter is necessary to see which
      campaign's data is being accessed""")

  result = campaignUrlParam


proc campaignGuestAccessMiddleware*(): HandlerAsync =
  result = proc(ctx: Context) {.async.} =  
    when not DEBUG:
      let ctx = JWTContext(ctx)

      let userCampaignMemberships = getUserCampaignMemberships(ctx)
      let campaignUrlParam = getCampaignUrlParameter(ctx)

      if not hasGuestAccessLevelOrHigher(userCampaignMemberships, campaignUrlParam):
        resp get401UnauthorizedResponse(ctx)
        return

    await switch(ctx)

proc campaignMemberAccessMiddleware*(): HandlerAsync =
  result = proc(ctx: Context) {.async.} =  
    when not DEBUG:
      let ctx = JWTContext(ctx)

      let userCampaignMemberships = getUserCampaignMemberships(ctx)
      let campaignUrlParam = getCampaignUrlParameter(ctx)
      
      if not hasMemberAccessLevelOrHigher(userCampaignMemberships, campaignUrlParam):
        resp get401UnauthorizedResponse(ctx)
        return

    await switch(ctx)

proc campaignAdminAccessMiddleware*(): HandlerAsync =
  result = proc(ctx: Context) {.async.} =  
    when not DEBUG:
      let ctx = JWTContext(ctx)

      let userCampaignMemberships = getUserCampaignMemberships(ctx)
      let campaignUrlParam = getCampaignUrlParameter(ctx)
      
      if not hasCampaignAdminAccessLevel(userCampaignMemberships, campaignUrlParam):
        resp get401UnauthorizedResponse(ctx)
        return

    await switch(ctx)