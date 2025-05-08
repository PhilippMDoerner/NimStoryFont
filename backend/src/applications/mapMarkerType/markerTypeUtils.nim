import ./markerTypeModel
import ../../utils/jwtContext

proc checkReadMarkerTypeListPermission*(ctx: JWTContext, entries: seq[MarkerType]) =
  return
