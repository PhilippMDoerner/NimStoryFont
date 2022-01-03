import prologue
import ../applications/authentication/myJwt
import options
import strutils
import ../applicationSettings
import jwt

type JWTContext* = ref object of Context
    tokenData*: Option[TokenData]

proc hasAccessToken(ctx: Context): bool =
    result = ctx.request.hasHeader(AUTHORIZATION_HEADER)

proc getAccessToken(ctx: Context): Option[JWT] =
    let headerValue: string = ctx.request.getHeader(AUTHORIZATION_HEADER)[0]
    let jwtString: string = headerValue.split(' ')[1]
    result = parseJWT(jwtString)

method extend(ctx: JWTContext) =
    if not hasAccessToken(ctx):
        ctx.tokenData = none(TokenData)
        return

    let tokenOption: Option[JWT] = getAccessToken(ctx)
    if tokenOption.isNone():
        ctx.tokenData = none(TokenData)
        return
    
    let token: JWT = tokenOption.get()
    let tokenData: TokenData = myJwt.extractTokenData(token)
    ctx.tokenData = some(tokenData)
