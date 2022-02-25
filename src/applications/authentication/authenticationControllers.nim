import prologue
import std/[json, times]
import ../../utils/errorResponses
import myJwt
import authenticationService
import authenticationModels
import djangoEncryption
import ../../applicationSettings
import jwt


proc getRefreshToken(ctx: Context): Option[JWT] =
    let requestBody: string = ctx.request.body()
    let parsedRequestBody: JsonNode = parseJson(requestBody)
    let refreshTokenString: string = parsedRequestBody.fields["refresh"].getStr()

    result = parseJWT(refreshTokenString)


proc getTokenLifetime(ctx: Context, tokenType: JWTType): TimeInterval =
    var lifetimeKey: string
    case tokenType:
      of JWTType.ACCESS:
        lifetimeKey = "accessTokenLifetimeInDays"
      of JWTType.REFRESH:
        lifetimeKey = "refreshTokenLifetimeInDays"
    
    let lifetimeDays = ctx.getSettings(lifetimeKey).getInt()
    result = days(lifetimeDays)

proc createNextToken(user: User, tokenType: JWTType, ctx: Context): JWT =
    let secretKey: string = ctx.getSettings( "secretKey").getStr()
    let lifetime: TimeInterval = ctx.getTokenLifetime(tokenType)

    let userContainer: UserContainer = getUserContainer(user)
    var newToken: JWT = userContainer.createToken(tokenType, lifetime)
    newToken.sign(secretKey)
    result = newToken


proc refreshTokens*(ctx: Context) {.async.} =
    let refreshTokenOption: Option[JWT] = getRefreshToken(ctx)
    if refreshTokenOption.isNone():
        resp get401UnauthorizedResponse(ctx)
        return

    let refreshToken: JWT = refreshTokenOption.get()
    if not myJwt.isValidRefreshToken(ctx, refreshToken):
        resp get401UnauthorizedResponse(ctx)
        return

    let tokenData: TokenData = extractTokenData(refreshToken)
    let user: User = getUserById(tokenData.userId)
    
    let newAccessToken: JWT = createNextToken(user, JWTType.ACCESS, ctx)
    let newRefreshToken: JWT = createNextToken(user, JWTType.REFRESH, ctx)

    resp jsonResponse(%*{"refresh": newRefreshToken, "access": newAccessToken})


proc login*(ctx: Context) {.async.} =
    let requestBody: JsonNode = parseJson(ctx.request.body())
    let userName: string = requestBody.fields["username"].getStr()
    let user: User = getUserByName(userName)

    let plainPassword: string = requestBody.fields["password"].getStr()
    let secretKey = ctx.getSettings("secretKey").getStr()
    if not plainPassword.isValidPassword(user.password, secretKey):
        resp get401UnauthorizedResponse(ctx)
        return
    
    let newAccessToken: JWT = createNextToken(user, JWTType.ACCESS, ctx)
    let newRefreshToken: JWT = createNextToken(user, JWTType.REFRESH, ctx)

    resp jsonResponse(%*{"refresh": newRefreshToken, "access": newAccessToken})
