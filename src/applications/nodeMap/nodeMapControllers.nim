import std/[json, strutils]
import prologue
import jsony
import ./nodeMapService
import ./nodeMapSerialization
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../allUrlParams
import ../controllerTemplates



proc fetchNodeMap*(ctx: Context) {.async, gcsafe.} =
  let ctx = JWTContext(ctx)
  
  let campaignName: string = ctx.getPathParamsOption(CAMPAIGN_NAME_PARAM).get()
  
  respondOnError():
    let nodeMap = getNodeMap(campaignName).serializeNodeMap()
    resp jsonyResponse(ctx, nodeMap)