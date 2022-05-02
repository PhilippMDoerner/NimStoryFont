import prologue
import jwt
import std/[options, logging, json, tables, random, times, strutils, strformat]
import authenticationModels
import tokenTypes 

export jwt
export tokenTypes




#[ parses a JWT from string form to JWT form]#
proc parseJWT*(unparsedToken: string): Option[JWT] =
    result = none(JWT)

    try: 
        result = some(unparsedToken.toJWT())
    except Exception:
        logging.debug "Received JWT could not be parsed!"

    return result


proc isExpiredJWTToken(token: JWT): bool = 
    let expirationClaim: Claim = token.claims["exp"]
    let expirationTimestamp: BiggestInt = expirationClaim.node.num
    
    let nowTimestamp: BiggestInt = getTime().toUnix()

    result = nowTimestamp >= expirationTimestamp


proc isAccessToken(token: JWT): bool =
    let tokenTypeClaim: Claim = token.claims["token_type"]
    let tokenType = tokenTypeClaim.node.str
    result = tokenType == "access"


proc isRefreshToken(token: JWT): bool = 
    let tokenTypeClaim: Claim = token.claims["token_type"]
    let tokenType = tokenTypeClaim.node.str
    result = tokenType == "refresh"


proc hasVerifiedTokenSecret(ctx: Context, token: JWT): bool =
    token.verify(ctx.getSettings("secretKey").getStr(), SignatureAlgorithm.HS256)


#[ Checks whether the given access token is valid ]#
proc isValidAccessToken*(ctx: Context, token: JWT): bool =
    if not isAccessToken(token):
        logging.debug "JWT is not access token!"
        return false

    if not ctx.hasVerifiedTokenSecret(token):
        logging.debug "JWT is access token but not valid!"
        return false

    if isExpiredJWTToken(token):
        logging.debug "JWT is valid access token, but expired!"
        return false

    return true


#[ Checks whether the given refresh token is valid ]#
proc isValidRefreshToken*(ctx: Context, token: JWT): bool =
    if not isRefreshToken(token):
        logging.debug "JWT is not refresh token!"
        return false

    if not hasVerifiedTokenSecret(ctx, token):
        logging.debug "JWT is refresh token but not valid!"
        return false

    if isExpiredJWTToken(token):
        logging.debug "JWT is valid refresh token, but expired!"
        return false

    return true



#[ Retrieves the data from a given JWT token and translates the JSON bits into a stricter
and more useful data type of my own]#
proc extractTokenData*(token: JWT): TokenData =
    let 
        userId: int64 = token.claims["user_id"].node.num
        userName: string = token.claims["user_name"].node.str
        isAdmin: bool = token.claims["isAdmin"].node.bval
        isSuperUser: bool = token.claims["isSuperUser"].node.bval

    let unparsedCampaignMemberships: OrderedTable[string, JsonNode] = token.claims["campaign_memberships"].node.fields
    var campaignMemberships: CampaignMemberships = newMembershipTable()

    for campaignIdStr, membership in unparsedCampaignMemberships.pairs:
        let accessLevel = parseEnum[CampaignAccessLevel](membership.getStr())
        campaignMemberships[campaignIdStr] = accessLevel

    result = TokenData(
        campaignMemberships: campaignMemberships, 
        isAdmin: isAdmin,
        isSuperUser: isSuperUser,
        userId: userId,
        userName: userName
    )


proc randomString(length: int): string =
    for _ in 0..length:
        add(result, char(rand(int('A') .. int('z'))))


type JWTType* = enum
    REFRESH = "refresh",
    ACCESS = "access"


proc getExpirationTimestamp(tokenType: JWTTYPE, tokenLifetime: TimeInterval): int64 =
    let expirationTime: Time = getTime() + tokenLifetime
    result = expirationTime.toUnix()


# proc parseGroups(groups: seq[Group]): Table =
#     var groupTable = initTable[string, string]
    

proc `%`*(table: CampaignMemberships): JsonNode =
    ## Necessary to be able to parse CampaignMemberships to json for the JWT
    result = newJObject()
    for key, value in table.pairs:
        case key.kind:
        of CampaignIdType.citString: result.add(key.campaignName, %value)
        of CampaignIdType.citInt: result.add(fmt"{key.id}", %value)
        

proc createToken*(userContainer: UserContainer, tokenType: JWTType, tokenLifetime: TimeInterval): JWT =
    let expirationTimestamp: int64 = getExpirationTimestamp(tokenType, tokenLifetime)
    result = toJWT(%*{
        "header": {
            "alg": "HS256",
            "typ": "JWT"
        },
        "claims": {
            "user_id": userContainer.user.id,
            "user_name": userContainer.user.username,
            "isAdmin": userContainer.user.is_staff,
            "isSuperUser": userContainer.user.is_superuser,
            "campaign_memberships": userContainer.campaignMemberships.toJson(),
            "exp": expirationTimestamp,
            "token_type": tokenType,
            "jti": randomString(50)
        }
    })
