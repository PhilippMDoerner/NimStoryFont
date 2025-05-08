import std/[strutils, uri]
import prologue
import norm/[sqlite, model]
import jsony
import ./organizationService
import ../controllerTemplates
import ../allUrlParams
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization

proc getOrganizationByNameController*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
  let entryName: string = ctx.getPathParams(ARTICLE_NAME_PARAM).decodeUrl()

  respondOnError:
    let entry = getOrganizationByName(campaignName, entryName)
    resp jsonyResponse(ctx, entry)
