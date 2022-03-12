import searchModel
import searchService
import prologue
import jsony
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../allUrlParams


proc findArticles*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)
    let searchText: string = ctx.getPathParams(SEARCH_TEXT_PARAM)

    respondBadRequestOnDbError():
        let articles: seq[SearchSerializable] = searchService.findArticles(campaignName, searchText)
        resp jsonyResponse(ctx, articles)
