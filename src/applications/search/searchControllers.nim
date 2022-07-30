import searchModel
import searchService
import prologue
import jsony
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../allUrlParams
import std/options

type SearchResponse = object
    articles: seq[SearchSerializable]
    empty_response: Option[string]

proc findArticles*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)
    let searchText: string = ctx.getPathParams(SEARCH_TEXT_PARAM)

    respondOnError():
        let articles: seq[SearchSerializable] = searchService.findArticles(campaignName, searchText)
        let responeData = SearchResponse(empty_response: none(string), articles: articles)
        resp jsonyResponse(ctx, responeData)
