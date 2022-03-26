import prologue
import ruleService
import ruleModel
import std/[strutils, uri, db_sqlite]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import norm/model
import jsony
import ../controllerTemplates
import ../allUrlParams


proc getRuleByNameController*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
    let entryName: string = ctx.getPathParams(ARTICLE_NAME_PARAM).decodeUrl()

    respondBadRequestOnDbError():
        let entry = getRuleByName(campaignName, entryName)
        resp jsonyResponse(ctx, entry)
