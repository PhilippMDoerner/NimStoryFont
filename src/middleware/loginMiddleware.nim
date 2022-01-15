import prologue
import ../utils/jwtContext
import ../utils/errorResponses
import ../applicationSettings
import std/[strutils, options]
import ../applications/authentication/myJwt


proc hasAccessToken(ctx: Context): bool =
    result = ctx.request.hasHeader(AUTHORIZATION_HEADER)

proc getAccessToken(ctx: Context): Option[JWT] =
    let headerValue: string = ctx.request.getHeader(AUTHORIZATION_HEADER)[0]
    let jwtString: string = headerValue.split(' ')[1]
    result = parseJWT(jwtString)


proc loginMiddleware*(): HandlerAsync =
    result = proc(ctx: Context) {.async.} =  
        var ctx = JWTContext(ctx)

        when not DEBUG:
            if not hasAccessToken(ctx):
                resp get401UnauthorizedResponse(ctx)
                return

            let tokenOption: Option[JWT] = getAccessToken(ctx)
            let isParseableToken = tokenOption.isSome()
            if not isParseableToken:
                resp get401UnauthorizedResponse(ctx)
                return
            
            let token: JWT = tokenOption.get()
            if not isValidAccessToken(token):
                resp get401UnauthorizedResponse(ctx)
                return

            ctx.tokenData = extractTokenData(token)
        await switch(ctx)