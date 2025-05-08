import nimword
import ./userModel
import ../../applicationSettings
import ../../utils/[jwtContext, emailUtils]
import ../authentication/[authenticationUtils]

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
    checkSuperUserPermission(ctx, entry)

proc checkNoUserPermission*(ctx: JWTContext, entry: seq[User]) =
  return

proc checkNoUserMetaPermission*(ctx: JWTContext, entry: UserMetadata) =
  return

proc createPasswordDatabaseRepresentation*(password: string): string =
  result = hashEncodePassword(
    password, DEFAULT_HASH_ITERATIONS, algorithm = NimwordHashingAlgorithm.nhaArgon2id
  )

proc toEmail*(user: User): Email =
  createEmail(user.email, user.username)
