import norm/[sqlite, model]
import std/[strformat, strutils, sequtils, sugar, options]
import campaignModel
import ../authentication/authenticationModels
import ../genericArticleRepository
import ../genericRawRepository
import ../../applicationSettings
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType]

proc getGroupMembers*(connection: DbConn, groupIds: varargs[int64]): seq[UserGroup] =
  let groupIdStrs: string = groupIds.map(id => intToStr(id.int)).join(",")
  let sqlCondition = fmt"{UserGroup.table()}.group_id IN ({groupIdStrs})"
  result = connection.getList(UserGroup, sqlCondition)

proc readCampaignMembers*(connection: DbConn, campaign: Campaign): seq[UserGroup] =
  let campaignGroupIds: array[3, int64] = [
    campaign.guest_group_id.get(),
    campaign.member_group_id.get(),
    campaign.admin_group_id.get()
  ]
  result = connection.getGroupMembers(campaignGroupIds)

proc readCampaignMembers*(connection: DbConn, campaign: CampaignRead): seq[UserGroup] =
  let campaignGroupIds: array[3, int64] = [
    campaign.guest_group_id.get().id,
    campaign.member_group_id.get().id,
    campaign.admin_group_id.get().id
  ]
  result = connection.getGroupMembers(campaignGroupIds)

proc getCampaigns*(connection: DbConn, campaignIds: varargs[int64]): seq[CampaignRead] =
  let campaignIdStr: string = campaignIds.map(id => intToStr(id.int)).join(",")
  let sqlCondition = fmt"{CampaignRead.table()}.id IN ({campaignIdStr})"
  result = connection.getList(CampaignRead, sqlCondition)

proc trackCampaignVisit*(connection: DbConn, userId: int64, campaignName: string, lastVisit: DjangoDateTime) =
  let campaign: Campaign = connection.getEntryByField("name", campaignName, Campaign)
  const upsertCampaignVisitCommand = fmt """
    INSERT INTO {CAMPAIGN_VISIT_TABLE} (campaign_id, user_id, last_visit)
    VALUES (?, ?, ?)
    ON CONFLICT(campaign_id, user_id)
    DO UPDATE SET last_visit = ?
  """
  
  let commandParams: array[4, DbValue] = [
    campaign.id.dbValue(),
    userId.dbValue(),
    lastVisit.dbValue(),
    lastVisit.dbValue()
  ]
  
  connection.rawExec(upsertCampaignVisitCommand, commandParams)