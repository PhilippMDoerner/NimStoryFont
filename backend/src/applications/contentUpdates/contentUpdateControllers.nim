import contentUpdateService
import contentUpdateSerialization
import prologue
import ../controllerTemplates
import ../campaign/campaignService
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../allUrlParams
import std/[sequtils, strutils]

proc getRecentlyUpdatedArticles*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)
    let pageNumber: int = ctx.getPathParams(PAGE_NUMBER_PARAM, "0").parseInt()
    let pageSize: int = ctx.gScope.settings.getOrDefault("pageSize").getInt()

    respondOnError():
        var articles: seq[JsonNode] = contentUpdateService.getRecentlyUpdatedArticles(campaignName, pageNumber, pageSize)
        let userId = ctx.tokenData.userId
        let lastVisitDate = campaignService.getLastCampaignVisit(userId, campaignName)
        let serializedArticles = articles.mapIt(contentUpdateSerialize(it, lastVisitDate))
        resp jsonyResponse(ctx, serializedArticles)

        let isFetchingMostRecentEntries = pageNumber == 0
        if isFetchingMostRecentEntries:
            trackCampaignVisit(userId, campaignName)
        