import prologue
import creatureService
import creatureModel
import std/[strutils, uri, db_sqlite]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import norm/model
import jsony
import ../controllerTemplates
import ../allUrlParams


proc getCampaignCreaturesOverviewView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)

    respondBadRequestOnDbError():
        let creatures: seq[CreatureOverview] = creatureService.getCampaignCreatureListOverview(campaignName)
        resp jsonyResponse[seq[CreatureOverview]](ctx, creatures)


proc getCreatureByIdView*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let creatureId: int64 = parseInt(ctx.getPathParams(ID_PARAM))

    respondBadRequestOnDbError():
        let creature = creatureService.getCreaturebyId(creatureId)
        resp jsonyResponse[CreatureRead](ctx, creature)


proc getCreatureByNameView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
    let creatureName: string = ctx.getPathParams(ARTICLE_NAME_PARAM).decodeUrl()

    respondBadRequestOnDbError():
        let creature = getCreatureByName(campaignName, creatureName)
        resp jsonyResponse[CreatureRead](ctx, creature)
