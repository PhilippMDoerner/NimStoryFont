import prologue
import ../utils/jwtContext
import ../utils/errorResponses
import ../applicationSettings
import strutils
import options

proc hasAccessToken(ctx: JWTContext): bool =
    result = ctx.tokenData.isSome()


proc loginMiddleware*(): HandlerAsync =
    result = proc(ctx: Context) {.async.} =  
        let ctx = JWTContext(ctx)

        when not DEBUG:
            if not hasAccessToken(ctx):
                echo "Loginmiddleware this has no access token"
                errorResponses.set401Response(ctx)
                return
                
        await switch(ctx)