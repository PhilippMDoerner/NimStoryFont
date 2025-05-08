import std/[json, strutils]
import prologue
import jsony
import ./nodeMapService
import ./nodeMapSerialization
import ../allUrlParams
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../database

proc fetchNodeMap*(ctx: Context) {.async, gcsafe.} =
  let ctx = JWTContext(ctx)

  let campaignName: string = ctx.getPathParamsOption(CAMPAIGN_NAME_PARAM).get()

  respondOnError:
    withDbConn(con):
      let nodeMap = con.getNodeMap(campaignName).serializeNodeMap()
      resp jsonyResponse(ctx, nodeMap)
