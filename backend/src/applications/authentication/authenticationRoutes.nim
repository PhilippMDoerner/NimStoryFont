import prologue
import ./authenticationControllers
import ./authenticationService
import ./authenticationUtils
import ./authenticationSerialization
import ../genericArticleControllers
import ../../middleware/[loginMiddleware]

proc addAuthenticationRoutes*(app: Prologue) =
  app.addRoute(
    "/token/validate/",
    authenticationControllers.validateToken,
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re"/token/refresh", authenticationControllers.refreshTokens, httpMethod = HttpPost
  )

  app.addRoute("/token/logout", authenticationControllers.logout, httpMethod = HttpGet)

  app.addRoute(re"/token", authenticationControllers.login, httpMethod = HttpPost)

  app.addRoute(
    re"/group/",
    handler = createReadListHandler(
      readListProc = readGroups,
      checkPermission = checkNoPermission[authenticationModels.Group],
      serialize = serializeGroups,
    ),
    httpMethod = HttpGet,
  )

  app.addRoute("/mail/reset/", startPasswordResetWorkflow, httpMethod = HttpPost)

  app.addRoute("/mail/reset/confirm", confirmPasswordReset, httpMethod = HttpGet)

  app.addRoute(
    "/authdata/patch-password",
    patchPassword,
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    "/authdata", getAuthData, httpMethod = HttpGet, middlewares = @[loginMiddleware()]
  )
