import contentUpdateModel
import contentUpdateService
import prologue
import jsony
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../allUrlParams
import std/strutils

proc getRecentlyUpdatedArticles*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)
    let pageNumber: int = ctx.getPathParams(PAGE_NUMBER_PARAM, "0").parseInt()
    let pageSize: int = ctx.gScope.settings.getOrDefault("pageSize").getInt()

    respondBadRequestOnDbError():
        let articles: seq[ContentUpdateSerializable] = contentUpdateService.getRecentlyUpdatedArticles(campaignName, pageNumber, pageSize)
        resp jsonyResponse(ctx, articles)
