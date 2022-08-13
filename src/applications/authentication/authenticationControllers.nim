import prologue
import std/[json, strutils]
import ../../utils/[tokenTypes, jwtContext, myStrutils, errorResponses, databaseUtils, customResponses]
import authenticationService
import ../user/userService
import authenticationModels
import authenticationSerialization
import djangoEncryption
import ../../applicationSettings
import ../genericArticleRepository
import jsony
import tinypool/sqlitePool
import ../allUrlParams
import ../controllerTemplates

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
    let secretKey = ctx.getSetting(SettingName.snSecretKey).getStr()
    if not plainPassword.isValidPassword(user.password, secretKey):
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

    let newPassword = myStrutils.randomString(DEFAULT_RESET_PASSWORD_LENGTH)
    let settings = ctx.gScope.settings
    withDbConn(connection):
      let updatedUser = connection.updateUserPassword(userName, newPassword)
      sendPasswordResetEmail(updatedUser, newPassword, settings)

    respDefault(Http204)
