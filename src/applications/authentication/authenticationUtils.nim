import myJwt
import authenticationModels
import norm/model
import std/tables
import ../campaign/campaignService

type CampaignPermissionError* = object of CatchableError

proc getCampaignId[T: Model](entry: T): int64 =
  when entry.campaign_id is int64:
    result = entry.campaign_id
  elif entry.campaign_id is Model:
    result = entry.campaign_id.id
  else:
    result = entry.campaign_id()


proc checkWritePermission[T: Model](jwt: TokenData, entry: T) =
  let entryCampaignId: int64 = entry.getCampaignId()
  let userAccessLevel: CampaignAccessLevel = jwt.campaignMemberships[entryCampaignId]
  let hasWriteAccess = userAccessLevel == CampaignAccessLevel.MEMBER or userAccessLevel == CampaignAccessLevel.ADMIN
  if not hasWriteAccess:
    raise newException(CampaignPermissionError, "Only members and admins of this campaign can create/update/delete entries")


proc checkReadListPermission*(jwt: TokenData, campaignName: string) =
  let campaign = getCampaignByName(campaignName)
  let hasCampaignMembership = jwt.campaignMemberships.hasKey(campaign.id)
  if not hasCampaignMembership:
    raise newException(CampaignPermissionError, "You must be invited to a campaign to read its entries")


proc checkReadPermission*[T: Model](jwt: TokenData, entry: T) =  
  let entryCampaignId: int64 = entry.getCampaignId()
  let hasCampaignMembership = jwt.campaignMemberships.hasKey(entryCampaignId)
  if not hasCampaignMembership:
    raise newException(CampaignPermissionError, "You must be invited to a campaign to read its entries")


proc checkUpdatePermission*[T: Model](jwt: TokenData, entry: T) =
  checkWritePermission(jwt, entry)

proc checkCreatePermission*[T: Model](jwt: TokenData, entry: T) =
  checkWritePermission(jwt, entry)

proc checkDeletePermission*[T: Model](jwt: TokenData, entry: T) =
  checkWritePermission(jwt, entry)