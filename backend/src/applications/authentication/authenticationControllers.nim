import std/[json, sequtils, strutils, times, strformat, logging, uri]
import prologue
import jsony
import nimword
import ./authenticationService
import ./authenticationModels
import ./authenticationSerialization
import ./authenticationDTO
import ../allUrlParams
import ../controllerTemplates
import ../genericArticleRepository
import ../user/userService
import ../../applicationSettings
import ../../database
import ../../utils/[tokenTypes, jwtContext, errorResponses, customResponses]

proc setAuthCookies(response: var Response, accessToken, refreshToken: TokenSerializable) =
    response.setCookie(
        "refreshToken", 
        refreshToken.token, 
        expires = refreshToken.exp.fromUnix().utc,
        httpOnly = true,
        secure = true,
        sameSite = SameSite.None,
        path="/"
    )
    response.setCookie(
        "accessToken", 
        accessToken.token, 
        expires = accessToken.exp.fromUnix().utc,
        httpOnly = true,
        secure = true,
        sameSite = SameSite.None,
        path="/"
    )

proc createAuthResponse(ctx: Context, authData: AuthDataSerializable): Response =
    result = jsonyResponse(ctx, authData)
    result.setAuthCookies(authData.accessToken, authData.refreshToken)

proc deleteAuthCookies(resp: var Response, ctx: JWTContext) =
    for authCookieName in ["accessToken", "refreshToken"]:
        for domain in ["www.aldrune.com"]:
            let cookieValue = ctx.getCookie(authCookieName)
            let path = "/"
            resp.setCookie(
                authCookieName, 
                cookieValue, 
                expires = 0.fromUnix().utc,
                httpOnly = true,
                path="/"
            )

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
    let refreshToken = ctx.getCookie("refreshToken")
    if refreshToken == "":
        resp get401UnauthorizedResponse()
        return

    let tokenLifetime: int = ctx.getSetting(SettingName.snRefreshTokenLifetime).getInt()
    
    respondOnError():
        withDbConn(connection):
            let oldAuthenticationData: TokenData = connection.getRefreshTokenData(tokenLifetime, refreshToken)
            let user: User = connection.getEntryById(oldAuthenticationData.userId, User)

            connection.invalidateToken(oldAuthenticationData.jti)

            let newAuthData: AuthDataSerializable = connection.createAndSerializeAuthData(ctx, user)
            let response = createAuthResponse(ctx, newAuthData)
            
            resp response

proc patchPassword*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    const workflowLifetimeInSeconds = 15 * 60 # 15 minutes
    
    let userId = ctx.tokenData.userId
    
    let requestBody: JsonNode = parseJson(ctx.request.body())
    respondOnError():
        withDbConn(connection):
            let hasActiveWorkflow = connection.hasActiveWorkflowConfirmation(
                user_id, 
                WorkflowType.wtPASSWORD_RESET, 
                workflowLifetimeInSeconds
            )
            var user: User = connection.getEntryById(user_Id, User)
            
            let requiresOldPasswordCheck = not hasActiveWorkflow
            if requiresOldPasswordCheck:
                let oldPlainPassword: string = requestBody.fields["old_password"].getStr()
                if not oldPlainPassword.isValidPassword(user.password):
                    resp get401UnauthorizedResponse(ctx)
                    return
            
            let newPassword: string = requestBody.fields["password"].getStr()
            discard connection.updateUserPassword(user, newPassword)

            let authData: AuthDataSerializable = connection.createAndSerializeAuthData(ctx, user)
            resp createAuthResponse(ctx, authData)

proc login*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    let requestBody: JsonNode = parseJson(ctx.request.body())
    let userName: string = requestBody.fields["username"].getStr()
    
    var user: User
    try:
        user = getUserByName(userName)
    except NotFoundError:
        resp get401UnauthorizedResponse(ctx)
        return
    
    let plainPassword: string = requestBody.fields["password"].getStr()
    if not plainPassword.isValidPassword(user.password):
        resp get401UnauthorizedResponse(ctx)
        return
    
    respondOnError():
        withDbConn(connection):
            let loginData: AuthDataSerializable = connection.createAndSerializeAuthData(ctx, user)
            resp createAuthResponse(ctx, loginData)

proc logout*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    var response = initResponse(HttpVer11, Http200, initResponseHeaders())
    response.deleteAuthCookies(ctx)
    resp response

proc startPasswordResetWorkflow*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let requestBody: JsonNode = ctx.request.body().parseJson()
    
    let hasUserName = requestBody.hasKey("username")
    if(not hasUserName):
        resp(code = Http400, body = "Missing username")
        return
        
    let userName = requestBody["username"].getStr()
    
    withDbConn(connection):
        var user: User = getUserByName(userName)
        let dto = WorfklowStartResetDTO(
            user: user,
            workflow: WorkflowType.wtPASSWORD_RESET
        )
        try:
            let confirmation = connection.createConfirmationRequest(dto)
            await sendPasswordResetConfirmationRequestEmail(dto, confirmation)
            
        except MissingEmailError as e:
            resp(code = Http400, body = fmt"User '{userName}' has no email address to send reset passwords to")
            return
        except MailAuthenticationError as e:
            debugErrorLog(fmt"The server is unable to send emails at this time. The authentication configuration for email is likely wrong")
            resp(code = Http500, body = fmt"The server is unable to send emails at this time")
            return

    respDefault(Http204)

# Does not do anything, as the loginMiddleware it is used with already contains all the logic
proc validateToken*(ctx: Context) {.async.} =
    respDefault(Http200)

proc getAuthData*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let isLoggedIn = ctx.tokenData.userId > 0
    if not isLoggedIn:
        resp get401UnauthorizedResponse(ctx)
        return
    
    withDbConn(con):
        let authData: AuthDataSerializable2 = serializeAuthData(ctx.tokenData)
        resp jsonyResponse(ctx, authData)
        
type WorkflowState = enum
    wsSuccess = "success"
    wsFailureMissingEmail = "failure-missing-email"
    wsFailureCanNotConfirm = "failure-general"
    wsFailureServerMailMisconfigured = "failure-server-mail-misconfigured"

proc getClientUrl*(ctx: Context, queryParams: varargs[(string, string)]): string =
    let domain = ctx.getSetting(snServerDomain).getStr()
    let hasQueryParams = queryParams.len > 0
    return if hasQueryParams:
        let queryParamsStr = queryParams.mapIt(fmt"{it[0]}={it[1]}").join("&")
        fmt"https://{domain}/wiki2?{queryParamsStr}"
      else:
        fmt"https://{domain}/wiki2"

proc getQueryParams*(ctx: Context): Table[string, string] =
    let queryParamsStr = ctx.request.query
    for (key, value) in queryParamsStr.decodeQuery():
        result[key] = value
    
proc getKeyOption*(tbl: Table[string, string], key: string): Option[string] =
    if tbl.hasKey(key):
        return some(tbl[key])
    else:
        return none(string)

proc confirmPasswordReset*(ctx: Context) {.async.} =
    const workflowLifetimeInSeconds = 15 * 60 # 15 minutes
    
    let queryParams = ctx.getQueryParams()  
    let workflowToken = queryParams.getKeyOption("token")
    let workflow = queryParams.getKeyOption("workflow")
    let user_id = queryParams.getKeyOption("user")
    let canConfirm = workflowToken.isSome() and workflow.isSome() and user_id.isSome()
    var workflowState = WorkflowState.wsFailureCanNotConfirm
    
    ctx.response = initResponse(HttpVer11, Http302, initResponseHeaders())
    var confirmation: Confirmation
    if canConfirm:
        let workflowToken = workflowToken.get()
        let workflow = parseEnum[WorkflowType](workflow.get())
        let user_id = user_id.get().parseInt()
        let dto = WorkflowConfirmDTO(
            token: workflowToken, 
            workflow: workflow, 
            user_id: user_id, 
            workflowLifetimeInSeconds: workflowLifetimeInSeconds
        )
        
        withDbConn(connection):
            try:
                # Being able to get this is both authentication and authorization (the token is valid, therefore you are the user).
                confirmation = connection.getCurrentConfirmationState(dto)
                # Immediately add auth cookies in case something goes wrong
                let user = connection.getEntryById(user_id, User)
                let authData = connection.createAndSerializeAuthData(ctx, user)
                ctx.response.setAuthCookies(
                    authData.accessToken,
                    authData.refreshToken
                )
                
                connection.confirmWorkflow(confirmation)
                workflowState = WorkflowState.wsSuccess

            except MissingEmailError as e:
                debugErrorLog(fmt"User '{user_id}' has no email address to send reset passwords to")
                workflowState = WorkflowState.wsFailureMissingEmail
            except MailAuthenticationError as e:
                debugErrorLog(fmt"The server is unable to send emails at this time. The authentication configuration for email is likely wrong")
                workflowState = WorkflowState.wsFailureServerMailMisconfigured
            except CatchableError:
                debugErrorLog("Could not confirm password reset")
                workflowState = WorkflowState.wsFailureCanNotConfirm
    
    var redirectQueryParams = @[
        ("source", $WorkflowType.wtPASSWORD_RESET), 
        ("state", $workflowState)
    ]
    if workflowState == WorkflowState.wsSuccess and not confirmation.isNil():
        let creationUnixTimestamp = DateTime(confirmation.creation_datetime).toTime().toUnix().int64
        let expirationTimestamp = creationUnixTimestamp + workflowLifetimeInSeconds
        redirectQueryParams.add(("expires", $expirationTimestamp))
    let redirectTarget = ctx.getClientUrl(redirectQueryParams)
    ctx.response.setHeader("location", redirectTarget)