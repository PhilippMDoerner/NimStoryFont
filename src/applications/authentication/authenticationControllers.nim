import std/[json, strutils, strformat, logging]
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
    let authHeaderValue: string = ctx.request.getHeader(AUTHORIZATION_HEADER)[0]
    let refreshToken = authHeaderValue.split(' ')[1]

    let tokenLifetime: int = ctx.getSetting(SettingName.snRefreshTokenLifetime).getInt()
    
    respondOnError():
        withDbConn(connection):
            let oldAuthenticationData: TokenData = connection.getRefreshTokenData(tokenLifetime, refreshToken)
            let user: User = connection.getEntryById(oldAuthenticationData.userId, User)

            connection.invalidateToken(oldAuthenticationData.jti)

            let newAuthData: AuthDataSerializable = connection.createAndSerializeAuthData(ctx, user)
            resp jsonyResponse(ctx, newAuthData)



proc login*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    let requestBody: JsonNode = parseJson(ctx.request.body())
    let userName: string = requestBody.fields["username"].getStr()
    let user: User = getUserByName(userName)

    let plainPassword: string = requestBody.fields["password"].getStr()
    if not plainPassword.isValidPassword(user.password):
        resp get401UnauthorizedResponse(ctx)
        return
    
    respondOnError():
        withDbConn(connection):
            let loginData: AuthDataSerializable = connection.createAndSerializeAuthData(ctx, user)
            resp jsonyResponse(ctx, loginData)

proc resetPassword*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let requestBody: JsonNode = ctx.request.body().parseJson()
    let userName = requestBody["username"].getStr()
    let settings = ctx.gScope.settings
    
    withDbConn(connection):
        var user: User = getUserByName(userName)

        try:
            discard await connection.resetUserPassword(user)
        except MissingEmailError as e:
            resp(code = Http400, body = fmt"User '{userName}' has no email address to send reset passwords to")
            return

    respDefault(Http204)

# Does not do anything, as the loginMiddleware it is used with already contains all the logic
proc validateToken*(ctx: Context) {.async.} =
    respDefault(Http200)
    