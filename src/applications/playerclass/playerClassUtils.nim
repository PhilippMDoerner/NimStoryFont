import ../../utils/jwtContext
import playerClassModel
import ../authentication/authenticationUtils

proc checkPlayerClassPermission*(ctx: JWTContext, entries: seq[PlayerClass] | PlayerClass) =
  return
