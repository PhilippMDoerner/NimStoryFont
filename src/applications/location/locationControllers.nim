import prologue
import locationService
import std/[strutils, uri]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import jsony
import ../controllerTemplates
import ../allUrlParams


proc getLocationByNameView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
    let locationName: string = ctx.getPathParams(ARTICLE_NAME_PARAM).decodeUrl()
    let parentLocationNameParam: string = ctx.getPathParams(PARENT_LOCATION_NAME_PARAM).decodeUrl().toLowerAscii()
    let parentLocationName: Option[string] = if parentLocationNameParam == "none": none(string) else: some(parentLocationNameParam)

    respondBadRequestOnDbError():
        let location = getLocationByName(campaignName, parentLocationName, locationName)
        resp jsonyResponse(ctx, location)
