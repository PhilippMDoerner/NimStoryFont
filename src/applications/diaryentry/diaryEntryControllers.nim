import prologue
import diaryEntryService
import diaryEntryModel
import std/[strutils, uri]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import jsony
import ../controllerTemplates
import ../allUrlParams

proc getDairyEntryController*(ctx: Context) {.async.} = 
  let ctx = JWTContext(ctx)

  let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
  let sessionNumber: int = parseInt(ctx.getPathParams(SESSION_NUMBER_PARAM).decodeUrl())
  let isMainSession: 0..1 = parseInt(ctx.getPathParams(SESSION_IS_MAIN_SESSION_PARAM).decodeUrl())
  let authorName: string = ctx.getPathParams(USERNAME_PARAM).decodeUrl()
 
  respondBadRequestOnDbError():
    let entry = getDiaryEntry(campaignName, sessionNumber, isMainSession, authorName)
    resp jsonyResponse(ctx, entry)