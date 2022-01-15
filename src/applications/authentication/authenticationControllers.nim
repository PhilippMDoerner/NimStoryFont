import prologue
import json
import ../../utils/errorResponses
import myJwt
import ../../utils/database
import authenticationRepository
import authenticationModels
import djangoEncryption
import ../../applicationSettings
import jwt


#proc createToken*(ctx: Context) {.async.} =

proc getRefreshToken(ctx: Context): Option[JWT] =
    let requestBody: string = ctx.request.body()
    let parsedRequestBody: JsonNode = parseJson(requestBody)
    let refreshTokenString: string = parsedRequestBody.fields["refresh"].getStr()

    result = parseJWT(refreshTokenString)


proc createNextToken(user: User, tokenType: JWTType): JWT =
    var newToken: JWT = user.createToken(JWTType.REFRESH)
    newToken.sign(applicationSettings.SECRET_KEY)
    result = newToken


proc refreshTokens*(ctx: Context) {.async.} =
    let refreshTokenOption: Option[JWT] = getRefreshToken(ctx)
    if refreshTokenOption.isNone():
        resp get401UnauthorizedResponse(ctx)
        return

    let refreshToken: JWT = refreshTokenOption.get()
    if not myJwt.isValidRefreshToken(refreshToken):
        resp get401UnauthorizedResponse(ctx)
        return

    let tokenData: TokenData = extractTokenData(refreshToken)
    let user: User = getUserById(tokenData.userId)
    
    let newAccessToken: JWT = createNextToken(user, JWTType.ACCESS)
    let newRefreshToken: JWT = createNextToken(user, JWTType.REFRESH)

    resp jsonResponse(%*{"refresh": newRefreshToken, "access": newAccessToken})


proc login*(ctx: Context) {.async.} =
    let requestBody: JsonNode = parseJson(ctx.request.body())
    let userName: string = requestBody.fields["username"].getStr()
    let user: User = getUserByName(userName)

    let plainPassword: string = requestBody.fields["password"].getStr()
    if not isValidPassword(plainPassword, user.password):
        resp get401UnauthorizedResponse(ctx)
        return
    
    let newAccessToken: JWT = createNextToken(user, JWTType.ACCESS)
    let newRefreshToken: JWT = createNextToken(user, JWTType.REFRESH)

    resp jsonResponse(%*{"refresh": newRefreshToken, "access": newAccessToken})
