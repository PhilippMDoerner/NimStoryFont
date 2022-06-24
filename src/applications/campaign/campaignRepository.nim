import norm/[sqlite, model]
import std/[strformat, strutils, sequtils, sugar, options]
import ../authentication/authenticationModels
import campaignModel
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType]
import ../genericArticleRepository

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