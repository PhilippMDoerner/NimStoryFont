import prologue
import creatureService
import creatureModel
import std/[strutils, uri, db_sqlite]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import norm/model
import jsony
import ../controllerTemplates
import ../urlParamRegexPatterns


proc getCampaignCreaturesOverviewView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)

    respondBadRequestOnDbError():
        let creatures: seq[CreatureOverview] = creatureService.getCampaignCreatureListOverview(campaignName)
        resp jsonyResponse[seq[CreatureOverview]](ctx, creatures)


proc getCreatureByIdView*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let creatureId: int = parseInt(ctx.getPathParams(ID_PARAM))

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


proc createCreatureView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let jsonData: string = ctx.request.body()
    
    respondBadRequestOnDbError():
        let newCreatureEntry: CreatureRead = createCreature(jsonData)
        resp jsonyResponse[CreatureRead](ctx, newCreatureEntry)


proc deleteCreatureView*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let creatureId: int = parseInt(ctx.getPathParams(ID_PARAM))

    respondBadRequestOnDbError():
        deleteCreature(creatureId)
        respDefault(Http204)


proc updateCreatureView*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let creatureId: int = parseInt(ctx.getPathParams(ID_PARAM))
    let jsonData: string = ctx.request.body()

    respondBadRequestOnDbError():
        let updatedCreatureEntry = updateCreature(creatureId, jsonData)
        resp jsonyResponse[CreatureRead](ctx, updatedCreatureEntry)