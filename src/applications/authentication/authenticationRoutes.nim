import prologue
import authenticationControllers
import authenticationService
import authenticationUtils
import authenticationSerialization
import ../genericArticleControllers
import ../allUrlParams
import ../user/[userSerialization, userService]

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
            checkPermission = checkNoPermission,
            serialize = serializeGroup,
        ),
        httpMethod = HttpGet
    )

    app.addRoute(
        "/mail/reset/",
        resetPassword,
        httpMethod = HttpPost
    )
    