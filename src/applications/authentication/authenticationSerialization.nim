import authenticationModels
import norm/sqlite
import ../genericArticleRepository
import std/[options, sequtils, strformat, sugar]

type GroupSerializable* = object
    id*: int64
    name*: string
    permissions*: seq[int64]

proc serializeGroup*(connection: DbConn, entry: Group): GroupSerializable =
  let groupPermissionIds: seq[int64] = connection.getManyFromOne(entry, GroupPermission).map(joinEntry => joinEntry.permission_id)
  result = GroupSerializable(
    id: entry.id,
    name: entry.name,
    permissions: groupPermissionIds
  )

proc serializeGroups*(connection: DbConn, entries: seq[Group]): seq[GroupSerializable] =
  for entry in entries:
    result.add(connection.serializeGroup(entry))
  
type TokenSerializable* = object
  token*: string
  `type`: TokenType
  exp*: int64

proc serializeToken(tokenData: TokenContainer, tokenLifetimeInDays: int): TokenSerializable = 
  result.token = tokenData.token
  result.`type` = tokenData.`type`
  result.exp = tokenData.created + tokenLifetimeInDays * 24 * 60 * 60

type AuthDataSerializable* = object
  accessToken*: TokenSerializable
  refreshToken*: TokenSerializable
  campaignMemberships*: CampaignMemberships
  isAdmin*: bool
  isSuperUser*: bool
  userId*: int64 
  userName*: string

proc serializeLoginData*(
  userData: UserContainer,
  accessTokenData: TokenContainer, 
  accessTokenLifetimeInDays: int, 
  refreshTokenData: TokenContainer,
  refreshTokenLifetimeInDays: int
): AuthDataSerializable =
  result.accessToken = serializeToken(accessTokenData, accessTokenLifetimeInDays)
  result.refreshToken = serializeToken(refreshTokenData, refreshTokenLifetimeInDays)
  result.isAdmin = userData.user.is_staff
  result.isSuperUser = userData.user.is_superuser
  result.userId = userData.user.id
  result.userName = userData.user.username
  result.campaignMemberships = userData.campaignMemberships
