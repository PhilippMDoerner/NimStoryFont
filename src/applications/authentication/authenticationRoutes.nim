import prologue
import authenticationControllers

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
