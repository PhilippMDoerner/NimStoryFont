import prologue
import diaryEntryService
import diaryEntryModel
import std/[strutils, uri]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import jsony
import ../controllerTemplates
import ../allUrlParams


proc getCampaignDiaryEntryOverviewView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)

    respondBadRequestOnDbError():
        let diaryEntries: seq[DiaryEntryOverview] = diaryEntryService.getCampaignDiaryEntryListOverview(campaignName)
        resp jsonyResponse[seq[DiaryEntryOverview]](ctx, diaryEntries)
