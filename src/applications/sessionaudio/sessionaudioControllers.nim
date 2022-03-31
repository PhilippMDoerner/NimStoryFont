import prologue
import sessionaudioService
import std/[strutils, uri, db_sqlite]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import norm/model
import jsony
import ../controllerTemplates
import ../allUrlParams



proc getSessionAudioByParamController*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
    let sessionNumber: int = parseInt(ctx.getPathParams(SESSION_NUMBER_PARAM))
    let isMainSession: 0..1 = parseInt(ctx.getPathParams(SESSION_IS_MAIN_SESSION_PARAM).decodeUrl())

    respondBadRequestOnDbError():
        let entry = getSessionAudio(campaignName, sessionNumber, isMainSession)
        resp jsonyResponse(ctx, entry)
