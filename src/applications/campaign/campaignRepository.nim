import norm/[sqlite, model]
import std/[strformat, strutils, sequtils, sugar, options]
import ../authentication/authenticationModels
import campaignModel
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType, serialization]


proc getGroupMembers*(connection: DbConn, groupIds: varargs[int64]): seq[UserGroup] =
  var members = @[newModel(UserGroup)]

  let groupIdStrs: string = groupIds.map(id => intToStr(id.int)).join(",")
  let sqlCondition = fmt"{UserGroup.table()}.group_id IN ({groupIdStrs})"
  connection.select(members, sqlCondition)

  result = members

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

proc getCampaigns*(connection: DbConn, campaignIds: varargs[int64]): seq[CampaignOverview] =
  var campaigns = @[newModel(CampaignOverview)]

  let campaignIdStr: string = campaignIds.map(id => intToStr(id.int)).join(",")
  let sqlCondition = fmt"{CampaignOverview.table()}.id IN ({campaignIdStr})"
  connection.select(campaigns, sqlCondition)

  result = campaigns