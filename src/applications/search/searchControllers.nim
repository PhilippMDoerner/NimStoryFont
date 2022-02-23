import searchModel
import searchService
import prologue
import jsony
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses]


proc findArticles*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams("campaignName")
    let searchText: string = ctx.getPathParams("searchText")

    respondBadRequestOnDbError():
        let articles: seq[SearchSerializable] = searchService.findArticles(campaignName, searchText)
        resp jsonyResponse(ctx, articles)
