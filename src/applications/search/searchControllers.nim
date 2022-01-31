import searchModel
import searchRepository
import prologue
import jsony
import ../base_generics/controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses]


proc findArticles*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams("campaignName")
    let searchText: string = ctx.getPathParams("searchText")

    respondBadRequestOnDbError():
        let articles: seq[SearchSerializable] = searchRepository.findArticles(campaignName, searchText)
        resp jsonyResponse(ctx, articles)
