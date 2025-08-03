import std/[strutils, options, sequtils, sugar]
import prologue
import jsony
import ./searchModel
import ./searchService
import ../controllerTemplates
import ../allUrlParams
import ../articleModel
import ../../utils/[jwtContext, customResponses, errorResponses]

const FILTERS_PARAM = "articletypes"

proc toArticleType(s: string): Option[ArticleType] =
  case s
  of "character":
    return some atCharacter
  of "creature":
    return some atCreature
  of "diaryentry":
    return some atDiaryEntry
  of "encounter":
    return some atEncounter
  of "item":
    return some atItem
  of "location":
    return some atLocation
  of "map":
    return some atMap
  of "organization":
    return some atOrganization
  of "quest":
    return some atQuest
  of "sessionaudio":
    return some atSessionAudio
  of "spell":
    return some atSpell
  of "rule":
    return some atRule

  return none(ArticleType)

type SearchResponse = object
  articles: seq[SearchSerializable]
  empty_response: Option[string]

proc findArticles*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)
  let searchText: string = ctx.getPathParams(SEARCH_TEXT_PARAM)
  let filters: seq[ArticleType] = block:
    let filterStr = ctx.getQueryParams()[FILTERS_PARAM]
    let fromParam = collect(newSeq):
      for param in filterStr.split(","):
        let typ = param.toArticleType()
        if typ.isSome():
          typ.get()

    if fromParam.len > 0:
      fromParam
    else:
      ArticleType.toSeq()

  respondOnError:
    let articles: seq[SearchSerializable] =
      searchService.findArticles(campaignName, searchText, articleTypes = filters)
    let responeData = SearchResponse(empty_response: none(string), articles: articles)
    resp jsonyResponse(ctx, responeData)

proc findArticlesOfType*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)
  let articleType = parseEnum[ArticleType](ctx.getPathParams(ARTICLE_TYPE_PARAM))
  let searchText: string = ctx.getPathParams(SEARCH_TEXT_PARAM)

  respondOnError:
    let articles: seq[SearchSerializable] =
      searchService.findArticlesOfType(campaignName, articleType, searchText)
    resp jsonyResponse(ctx, articles)

proc findArticle*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  let articleType = parseEnum[ArticleType](ctx.getPathParams(ARTICLE_TYPE_PARAM))
  let articleId: int = ctx.getPathParams(ID_PARAM).parseInt()

  respondOnError:
    let article: SearchSerializable = searchService.findArticle(articleId, articleType)
    resp jsonyResponse(ctx, article)
