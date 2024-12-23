import prologue
import authenticationControllers
import authenticationService
import authenticationUtils
import authenticationSerialization
import ../genericArticleControllers

proc addAuthenticationRoutes*(app: Prologue) =
    app.addRoute(
        re"/token/refresh", 
        authenticationControllers.refreshTokens, 
        httpMethod = HttpPost,
    )

    app.addRoute(
        re"/token",
        authenticationControllers.login,
        httpMethod = HttpPost
    )

    app.addRoute(
        re"/group/",
        handler = createReadListHandler(
            readListProc = readGroups,
            checkPermission = checkNoPermission[authenticationModels.Group],
            serialize = serializeGroups,
        ),
        httpMethod = HttpGet
    )

    app.addRoute(
        "/mail/reset/",
        resetPassword,
        httpMethod = HttpPost
    )
    