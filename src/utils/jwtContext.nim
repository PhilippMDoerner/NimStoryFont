import prologue
import ../applications/authentication/myJwt
import options
import strutils
import ../applicationSettings
import jwt

type JWTContext* = ref object of Context
    tokenData*: TokenData

proc getAccessToken(ctx: Context): Option[JWT] =
    let headerValue: string = ctx.request.getHeader(AUTHORIZATION_HEADER)[0]
    let jwtString: string = headerValue.split(' ')[1]
    result = parseJWT(jwtString)

method extend(ctx: JWTContext) =    
    ctx.tokenData = newTokenData()
