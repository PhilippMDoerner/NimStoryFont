import ../../utils/jwtContext
import markerTypeModel

proc checkReadMarkerTypeListPermission*(ctx: JWTContext, entries: seq[MarkerType]) =
  return
