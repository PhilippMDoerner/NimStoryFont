import searchModel
import searchService
import prologue
import jsony
import ../controllerTemplates
import ../allUrlParams
import ../articleModel
import ../../utils/[jwtContext, customResponses, errorResponses]
import std/[strutils, options]

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

proc findArticlesOfType*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)
    let articleType = parseEnum[ArticleType](ctx.getPathParams(ARTICLE_TYPE_PARAM))
    let searchText: string = ctx.getPathParams(SEARCH_TEXT_PARAM)

    respondOnError():
        let articles: seq[SearchSerializable] = searchService.findArticlesOfType(campaignName, articleType, searchText)
        resp jsonyResponse(ctx, articles)
        
proc findArticle*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let articleType = parseEnum[ArticleType](ctx.getPathParams(ARTICLE_TYPE_PARAM))
    let articleId: int = ctx.getPathParams(ID_PARAM).parseInt()
    
    respondOnError():
        let article: SearchSerializable = searchService.findArticle(articleId, articleType)
        resp jsonyResponse(ctx, article)