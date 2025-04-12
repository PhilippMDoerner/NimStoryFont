import prologue
import organizationService
import std/[strutils, uri]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import norm/[sqlite, model]
import jsony
import ../controllerTemplates
import ../allUrlParams



proc getOrganizationByNameController*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
    let entryName: string = ctx.getPathParams(ARTICLE_NAME_PARAM).decodeUrl()

    respondOnError():
        let entry = getOrganizationByName(campaignName, entryName)
        resp jsonyResponse(ctx, entry)
