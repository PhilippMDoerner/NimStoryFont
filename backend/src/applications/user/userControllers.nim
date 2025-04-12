import prologue
import ./userModel
import ./userService
import ./userSerialization
import ./userUtils
import ../allUrlParams
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../database

proc getSettingsCategory*(ctx: Context) {.async, gcsafe.} =
  let ctx = JWTContext(ctx)
  
  let userId = ctx.tokenData.userId
  let settingsCategory = ctx.getPathParams(SETTING_CATEGORY_PARAM)
  
  respondOnError():
    withDbConn(connection):
      let settings = connection.getUserMetadataByCategory(userId, settingsCategory)
      let serializedSettings: seq[UserMetadataSerializable] = connection.serializeUserMetadataEntries(settings)
      resp jsonyResponse(ctx, serializedSettings)
