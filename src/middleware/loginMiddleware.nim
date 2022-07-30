import prologue
import ../utils/[databaseUtils, jwtContext]
import ../applicationSettings
import std/[strutils, options, json]
import ../applications/authentication/[authenticationService, myJwt]
import ../utils/errorResponses
import ../applications/controllerTemplates



proc hasAccessToken(ctx: Context): bool =
    result = ctx.request.hasHeader(AUTHORIZATION_HEADER)

proc getAccessToken(ctx: Context): Option[JWT] =
    let headerValue: string = ctx.request.getHeader(AUTHORIZATION_HEADER)[0]
    let jwtString: string = headerValue.split(' ')[1]
    result = parseJWT(jwtString)


proc loginMiddleware*(): HandlerAsync =
    result = proc(ctx: Context) {.async.} =  
        var ctx = JWTContext(ctx)

        let authHeaderValue: string = ctx.request.getHeader(AUTHORIZATION_HEADER)[0]
        let token = authHeaderValue.split(' ')[1]
        let tokenLifetime: int = ctx.getSetting(SettingName.snAccesTokenLifetime).getInt()
        respondBadRequestOnDbError():
            withDbConn(connection):
                ctx.tokenData = connection.getAccessTokenData(tokenLifetime, token)

        await switch(ctx)

proc jwtLoginMiddleware*(): HandlerAsync =
    result = proc(ctx: Context) {.async.} =  
        var ctx = JWTContext(ctx)

        if not hasAccessToken(ctx):
            resp get401UnauthorizedResponse(ctx)
            return

        let tokenOption: Option[JWT] = getAccessToken(ctx)
        let isParseableToken = tokenOption.isSome()
        if not isParseableToken:
            resp get401UnauthorizedResponse(ctx)
            return
        
        let token: JWT = tokenOption.get()
        if not ctx.isValidAccessToken(token):
            resp get401UnauthorizedResponse(ctx)
            return

        ctx.tokenData = extractTokenData(token)
        
        await switch(ctx)