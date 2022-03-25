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



proc getCreatureByNameView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
    let creatureName: string = ctx.getPathParams(ARTICLE_NAME_PARAM).decodeUrl()

    respondBadRequestOnDbError():
        let creature = getCreatureByName(campaignName, creatureName)
        resp jsonyResponse[CreatureRead](ctx, creature)
