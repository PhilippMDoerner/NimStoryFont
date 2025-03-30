import std/[json, strutils, times, strformat, logging]
import prologue
import jsony
import nimword
import ./authenticationService
import ./authenticationModels
import ./authenticationSerialization
import ../allUrlParams
import ../controllerTemplates
import ../genericArticleRepository
import ../user/userService
import ../../applicationSettings
import ../../database
import ../../utils/[tokenTypes, jwtContext, errorResponses, customResponses]

proc createAuthResponse(ctx: Context, authData: AuthDataSerializable): Response =
    result = jsonyResponse(ctx, authData)
    result.setCookie(
        "refreshToken", 
        authData.refreshToken.token, 
        expires = authData.refreshToken.exp.fromUnix().utc,
        httpOnly = true,
        secure = true,
        sameSite = SameSite.None,
        path="/"
    )
    result.setCookie(
        "accessToken", 
        authData.accessToken.token, 
        expires = authData.accessToken.exp.fromUnix().utc,
        httpOnly = true,
        secure = true,
        sameSite = SameSite.None,
        path="/"
    )

proc deleteAuthCookies(resp: var Response, ctx: JWTContext) =
    for authCookieName in ["accessToken", "refreshToken"]:
        for domain in ["www.aldrune.com"]:
            let cookieValue = ctx.getCookie(authCookieName)
            let path = "/"
            resp.setCookie(
                authCookieName, 
                cookieValue, 
                expires = 0.fromUnix().utc,
                httpOnly = true,
                path="/"
            )

proc createAndSerializeAuthData(connection: DbConn, ctx: Context, user: User): AuthDataSerializable =
        let accessTokenLifetimeInDays: int = ctx.getSetting(SettingName.snAccesTokenLifetime).getInt()
        let refreshTokenLifetimeInDays: int = ctx.getSetting(SettingName.snRefreshTokenLifetime).getInt()
            
        let userContainer: UserContainer = connection.getUserContainer(user)
        let accessToken: TokenContainer = connection.createAuthToken(user, access)
        let refreshToken: TokenContainer = connection.createAuthToken(user, refresh)
        result = serializeLoginData(
            userContainer,
            accessToken, 
            accessTokenLifetimeInDays, 
            refreshToken, 
            refreshTokenLifetimeInDays
        )

proc refreshTokens*(ctx: Context) {.async.} =
    let refreshToken = ctx.getCookie("refreshToken")
    if refreshToken == "":
        resp get401UnauthorizedResponse()
        return

    let tokenLifetime: int = ctx.getSetting(SettingName.snRefreshTokenLifetime).getInt()
    
    respondOnError():
        withDbConn(connection):
            let oldAuthenticationData: TokenData = connection.getRefreshTokenData(tokenLifetime, refreshToken)
            let user: User = connection.getEntryById(oldAuthenticationData.userId, User)

            connection.invalidateToken(oldAuthenticationData.jti)

            let newAuthData: AuthDataSerializable = connection.createAndSerializeAuthData(ctx, user)
            let response = createAuthResponse(ctx, newAuthData)
            
            resp response



proc login*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    let requestBody: JsonNode = parseJson(ctx.request.body())
    let userName: string = requestBody.fields["username"].getStr()
    
    var user: User
    try:
        user = getUserByName(userName)
    except NotFoundError:
        resp get401UnauthorizedResponse(ctx)
        return
    
    let plainPassword: string = requestBody.fields["password"].getStr()
    if not plainPassword.isValidPassword(user.password):
        resp get401UnauthorizedResponse(ctx)
        return
    
    respondOnError():
        withDbConn(connection):
            let loginData: AuthDataSerializable = connection.createAndSerializeAuthData(ctx, user)
            let response = createAuthResponse(ctx, loginData)
            
            resp response

proc logout*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    var response = initResponse(HttpVer11, Http200, initResponseHeaders())
    response.deleteAuthCookies(ctx)
    resp response

proc resetPassword*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let requestBody: JsonNode = ctx.request.body().parseJson()
    
    let hasUserName = requestBody.hasKey("username")
    if(not hasUserName):
        resp(code = Http400, body = "Missing username")
        return
        
    let userName = requestBody["username"].getStr()
    let settings = ctx.gScope.settings
    
    withDbConn(connection):
        var user: User = getUserByName(userName)

        try:
            discard await connection.resetUserPassword(user)
        except MissingEmailError as e:
            resp(code = Http400, body = fmt"User '{userName}' has no email address to send reset passwords to")
            return
        except MailAuthenticationError as e:
            log(lvlError, fmt"The server is unable to send emails at this time", e.repr)
            resp(code = Http500, body = fmt"The server is unable to send emails at this time")
            return

    respDefault(Http204)

# Does not do anything, as the loginMiddleware it is used with already contains all the logic
proc validateToken*(ctx: Context) {.async.} =
    respDefault(Http200)

proc getAuthData*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let isLoggedIn = ctx.tokenData.userId > 0
    if not isLoggedIn:
        resp get401UnauthorizedResponse(ctx)
        return
    
    withDbConn(con):
        let authData: AuthDataSerializable2 = serializeAuthData(ctx.tokenData)
        resp jsonyResponse(ctx, authData)