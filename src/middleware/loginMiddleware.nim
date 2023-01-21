import std/[strutils, json, logging]
import prologue
import norm/sqlite
import ../utils/[jwtContext]
import ../applicationSettings
import ../database
import ../applications/authentication/[authenticationService, authenticationUtils]
import ../utils/[errorResponses]

template debugErrorLog(msg: string) =
     debug(msg & " : ", getCurrentException().name, getCurrentExceptionMsg(), getCurrentException().getStackTraceEntries()) 


proc loginMiddleware*(): HandlerAsync =
    result = proc(ctx: Context) {.async.} =  
        var ctx = JWTContext(ctx)

        let authHeaderValue: string = ctx.request.getHeader(AUTHORIZATION_HEADER)[0]
        let token = authHeaderValue.split(' ')[1]
        let tokenLifetime: int = ctx.getSetting(SettingName.snAccesTokenLifetime).getInt()
        try:
            withDbConn(connection):
                ctx.tokenData = connection.getAccessTokenData(tokenLifetime, token)

        except DbError:
            debugErrorLog("Error during db request") 
            resp get400BadRequestResponse(getCurrentExceptionMsg())
            return

        except UnauthorizedError:
            debugErrorLog("User could not be authorized")
            resp get401UnauthorizedResponse()
            return
        
        except CampaignPermissionError:
            debugErrorLog("User does not have the necessary permission for this campaign")
            resp get403ForbiddenResponse()
            return

        except CatchableError:
            debugErrorLog("Unkonwn Error during db request") 
            resp get500ServerErrorResponse()
            return

        await switch(ctx)