import prologue
import questService
import questModel
import std/[strutils, uri, db_sqlite]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import norm/model
import jsony
import ../controllerTemplates
import ../allUrlParams



proc getQuestByNameController*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
    let entryName: string = ctx.getPathParams(ARTICLE_NAME_PARAM).decodeUrl()

    respondBadRequestOnDbError():
        let entry = getQuestByName(campaignName, entryName)
        resp jsonyResponse(ctx, entry)
