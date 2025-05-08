import std/[strformat, sequtils, sugar, strutils]
import norm/[sqlite]
import ./userModel
import ../genericArticleRepository

proc getCampaignMemberIds(connection: DbConn, campaignName: string): seq[int64] =
  const campaignUserQuery = sql """
    WITH targetCampaign AS (
      SELECT *
      FROM wikientries_campaign
      WHERE name LIKE ?
    )
	
	  SELECT members.id
    FROM targetCampaign campaign
    INNER JOIN auth_group memberGroup ON campaign.member_group_id = memberGroup.id
    INNER JOIN auth_user_groups memberJoin ON memberGroup.id = memberJoin.group_id
    INNER JOIN auth_user members ON memberJoin.user_id = members.id
  """

  let rows: seq[Row] = connection.getAllRows(campaignUserQuery, campaignName)
  result = rows.map(row => row[0].i)

proc getCampaignUsers*(connection: DbConn, campaignName: string): seq[User] =
  var entries = @[new(User)]

  let memberIds = connection.getCampaignMemberIds(campaignName)
  let memberIdStr = memberIds.map(id => id.int.intToStr).join(",")
  let condition = fmt"id IN ({memberIdStr})"

  connection.select(entries, condition)

  result = entries

proc fetchUserMetadataByCategory*(
    connection: DbConn, userId: int64, category: string
): seq[UserMetadata] =
  const condition = "user_id = ? AND category = ?"

  return
    connection.getList(UserMetadata, condition, userId.dbValue(), category.dbValue())
