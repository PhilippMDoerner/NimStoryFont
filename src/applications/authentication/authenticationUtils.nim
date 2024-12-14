import authenticationModels
import norm/model
import prologue
import ../genericArticleRepository
import std/[options, tables, strformat, logging, sysrand, base64]
import ../../utils/[jwtContext]
import ../allUrlParams
import ../campaign/campaignModel

type UnauthorizedError* = object of CatchableError
type CampaignPermissionError* = object of CatchableError
type AdminPermissionError* = object of CatchableError

proc getCampaignId[T: Model](entry: T): int64 =
  ## Fetches the id of the campaign a given article belongs to
  ## Depending on the input type, this has differing behaviours
  ## If the input has a direct campaign field directly, that field is taken
  ## If the input has no direct campaign field, a campaign_id() proc must be provided by the caller
  when entry is Campaign:
    result = entry.id
  elif compiles(entry.campaign_id):
    when entry.campaign_id is int64:
      result = entry.campaign_id
    elif entry.campaign_id is Model:
      result = entry.campaign_id.id
  else:
    mixin campaign_id
    result = entry.campaign_id()


proc checkCampaignWritePermission(ctx: JWTContext, entryCampaignId: int64) =
  if ctx.hasAdminPermission():
    return

  if not ctx.hasCampaignMembership(entryCampaignId):
    raise newException(CampaignPermissionError, fmt"You are not a member of the campaign '{entryCampaignId}' which you're creating an entry for")

  let accessLevel: CampaignAccessLevel = ctx.getCampaignAccessLevel(entryCampaignId)
  let hasWritePermission = accessLevel in [CampaignAccessLevel.MEMBER, CampaignAccessLevel.ADMIN]
  if not hasWritePermission:
    raise newException(CampaignPermissionError, "Only members and admins of this campaign can create/update/delete entries")


proc checkCampaignWritePermission[T: Model](ctx: JWTContext, entry: T) =
  let entryCampaignId: int64 = entry.getCampaignId()
  checkCampaignWritePermission(ctx, entryCampaignId)

proc checkAdminPermission*[T: Model](ctx: JWTContext, entry: T) = 
  let hasAdminPermission = ctx.hasAdminPermission()
  if not hasAdminPermission:
    raise newException(AdminPermissionError, "Only admins of the webpage can perform this action")


proc checkSuperUserPermission*[T: Model](ctx: JWTContext, entry: T) = 
  let hasSuperUserPermission = ctx.tokenData.isSuperUser
  if not hasSuperUserPermission:
    raise newException(AdminPermissionError, "Only superusers of the webpage can perform this action")


proc checkReadListPermission*(ctx: JWTContext, campaignName: string) =
  if ctx.hasAdminPermission():
    return

  let campaign = getEntryByField("name", campaignName, Campaign)
  if not ctx.hasCampaignMembership(campaign.id):
    log(lvlDebug, fmt"'{ctx.tokenData.username}' does not have access to campaign '{campaignName}'")
    raise newException(CampaignPermissionError, "You must be invited to a campaign to read its entries")


proc checkReadPermission*[T: Model](ctx: JWTContext, entry: T) =
  if ctx.hasAdminPermission():
    return
  
  let entryCampaignId: int64 = entry.getCampaignId()
  if not ctx.hasCampaignMembership(entryCampaignId):
    raise newException(CampaignPermissionError, "You must be invited to a campaign to read its entries")


proc checkUpdatePermission*[T: Model](ctx: JWTContext, entry: T) =
  checkCampaignWritePermission(ctx, entry)

proc checkCreatePermission*[T: Model](ctx: JWTContext, entry: T) =
  checkCampaignWritePermission(ctx, entry)

proc checkDeletePermission*[T: Model](ctx: JWTContext, entry: T) =
  checkCampaignWritePermission(ctx, entry)

proc checkUpdatePermission*(ctx: JWTContext, campaignId: int64) =
  checkCampaignWritePermission(ctx, campaignId)

proc checkCreatePermission*(ctx: JWTContext, campaignId: int64) =
  checkCampaignWritePermission(ctx, campaignId)

proc checkDeletePermission*(ctx: JWTContext, campaignId: int64) =
  checkCampaignWritePermission(ctx, campaignId)

proc checkCampaignReadListPermission*[T: Model](ctx: JWTContext, entries: seq[T]) = 
  if ctx.hasAdminPermission():
    return
  
  let campaignName: Option[string] = ctx.getPathParamsOption(CAMPAIGN_NAME_PARAM)
  if campaignName.isNone():
    const campaignNameParam = CAMPAIGN_NAME_PARAM
    const errorMsg =  fmt"Tried to check read list permission on route for a campaign, but the path contained no parameter '{campaignNameParam}'!"
    raise newException(RouteError, errorMsg)
  
  let campaign = getEntryByField("name", campaignName.get(), Campaign)
  if not ctx.hasCampaignMembership(campaign.id):
    raise newException(CampaignPermissionError, "You must be invited to a campaign to read its entries")

proc checkNoPermission*[T](ctx: JWTContext, entries: seq[T]) = 
  return

proc generateToken*(): string = urandom(30).encode()
