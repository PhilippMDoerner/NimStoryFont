import ../genericRawRepository
import std/[strformat, db_sqlite, strutils]
import ../../applicationSettings
import constructor/defaults
import ../../utils/tokenTypes
import authenticationUtils


proc deleteGroupMembership*(connection: DbConn, userId: int64, groupId: int64) =
  let query = fmt"""
    DELETE FROM {USER_GROUP_TABLE} 
    WHERE user_id = {userId} AND group_id = {groupId}
  """
  connection.rawExec(query)

type UserTokenRow {.defaults.} = object
  id: int = -1
  isStaff*: bool = false
  isSuperUser*: bool = false
  username*: string = ""
  created*: int64 = -1
  guestCampaignName*: string
  guestCampaignId*: string
  memberCampaignName*: string
  memberCampaignId*: string
  adminCampaignName*: string
  adminCampaignId*: string
implDefaults(UserTokenRow, {DefaultFlag.defExported, DefaultFlag.defTypeConstr}) 


proc getTokenData*(connection: DbConn, tokenLifetimeInDays: int64, token: string, tokenType: TokenType): TokenData =
  let tokenLifetimeInSeconds = tokenLifetimeInDays * 24 * 60 * 60
  let query = fmt"""
    SELECT 
      user.id,
      user.is_staff AS isAdmin,
      user.is_superuser AS isSuperUser,
      user.username,
      token.created AS created,
      guestCampaign.name AS guestCampaignName,
      guestCampaign.id AS guestCampaignId,
      memberCampaign.name AS memberCampaignName,
      memberCampaign.id AS memberCampaignId,
      adminCampaign.name AS adminCampaignName,
      adminCampaign.id AS adminCampaignId
    FROM {TOKEN_TABLE} token
    INNER JOIN {USER_TABLE} user ON token.user_id = user.id
    INNER JOIN {USER_GROUP_TABLE} membership ON user.id = membership.user_id
    INNER JOIN {GROUP_TABLE} userGroup ON membership.group_id = userGroup.id
    LEFT JOIN {CAMPAIGN_TABLE} guestCampaign ON guestCampaign.guest_group_id = userGroup.id
    LEFT JOIN {CAMPAIGN_TABLE} memberCampaign ON memberCampaign.member_group_id = userGroup.id
    LEFT JOIN {CAMPAIGN_TABLE} adminCampaign ON adminCampaign.admin_group_id = userGroup.id
    WHERE token.blacklisted IS FALSE 
      AND token.key = ? 
      AND token.created + {tokenLifetimeInSeconds} > CAST(strftime('%s', 'now') AS INT)
      AND token.tokenType = ?
  """

  let rows: seq[UserTokenRow] = connection.rawSelectRows(query, UserTokenRow, token, $tokenType)
  if rows.len() == 0:
    raise newException(UnauthorizedError, fmt"There is no valid token '{token}'")
  
  result = TokenData(
    isAdmin: rows[0].isStaff,
    isSuperUser: rows[0].isSuperUser,
    username: rows[0].username,
    userId: rows[0].id,
    jti: token,
    exp: rows[0].created + tokenLifetimeInSeconds,
    campaignMemberships: newMembershipTable()
  )

  for row in rows:
    if row.guestCampaignName != "":
      result.campaignMemberships[row.guestCampaignName] = CampaignAccessLevel.GUEST
      result.campaignMemberships[row.guestCampaignId.parseInt()] = CampaignAccessLevel.GUEST
    elif row.memberCampaignName != "":
      result.campaignMemberships[row.memberCampaignName] = CampaignAccessLevel.MEMBER
      result.campaignMemberships[row.memberCampaignId.parseInt()] = CampaignAccessLevel.MEMBER
    elif row.adminCampaignName != "":
      result.campaignMemberships[row.adminCampaignName] = CampaignAccessLevel.ADMIN
      result.campaignMemberships[row.adminCampaignId.parseInt()] = CampaignAccessLevel.ADMIN


proc blacklistToken*(connection: DbConn, token: string) =
  const query = fmt"""
    UPDATE {TOKEN_TABLE}
    SET blacklisted = TRUE;
    WHERE key = ?
  """
  connection.rawExec(query, token)

proc insertToken*(connection: DbConn, token: string, creationTimestamp: int64, userId: int64, tokenType: TokenType) =
  let query = fmt"""
    INSERT INTO {TOKEN_TABLE} (key, created, user_id, blacklisted, tokenType)
    VALUES (?, {creationTimestamp}, {userId}, FALSE, ?)
  """
  connection.rawExec(query, token, $tokenType)
