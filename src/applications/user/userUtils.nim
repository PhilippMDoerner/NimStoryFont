import userModel
import ../../applicationSettings
import ../../utils/[myStrutils, jwtContext]
import ../authentication/[djangoEncryption, authenticationUtils]
import std/[strformat]

proc checkUserDeletePermission*(ctx: JWTContext, entry: User) =
  let isSelfDelete = ctx.tokenData.userId == entry.id
  if (isSelfDelete):
    return

  let isDeletingNormalUser = not entry.is_staff and not entry.is_superuser
  if isDeletingNormalUser:
    checkAdminPermission(ctx, entry)
    return
  
  let isDeletingAdmin = entry.is_staff and not entry.is_superuser
  if isDeletingAdmin:
    checkSuperuserPermission(ctx, entry)

proc checkNoUserPermission*(ctx: JWTContext, entry: seq[User]) =
  return

proc createPasswordDatabaseRepresentation*(password: string, secretKey: string): string =
  let salt: string = myStrutils.randomString(DEFAULT_SALT_LENGTH)
  let hash: string = calcPasswordHash(password, salt, DEFAULT_HASH_ITERATIONS, secretKey)
  const hashAlgorithm: string = "pbkdf2_sha256"
  result = fmt"{hashAlgorithm}${DEFAULT_HASH_ITERATIONS}${salt}${hash}"
