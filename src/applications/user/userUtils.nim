import userModel
import ../../utils/jwtContext
import ../authentication/authenticationUtils

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



