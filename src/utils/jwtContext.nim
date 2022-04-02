import prologue
import ../applications/authentication/myJwt

export myJwt

type JWTContext* = ref object of Context
    tokenData*: TokenData

method extend(ctx: JWTContext) =    
    ctx.tokenData = newTokenData()
