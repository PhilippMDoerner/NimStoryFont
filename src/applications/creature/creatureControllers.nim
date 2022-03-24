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
