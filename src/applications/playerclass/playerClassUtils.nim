import ../../utils/jwtContext
import playerClassModel

proc checkPlayerClassPermission*(ctx: JWTContext, entries: seq[PlayerClass] | PlayerClass) =
  return
