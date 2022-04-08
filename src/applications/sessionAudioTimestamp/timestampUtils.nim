import timestampModel
import ../genericArticleRepository
import ../campaign/campaignService
import prologue
import ../../utils/jwtContext
import ../allUrlParams
import ../authentication/authenticationUtils

proc campaign_id*(entry: Timestamp): int64 =
  result = getEntryById(entry.session_audio_id, TimestampSessionAudio).session_id.campaign_id.id

proc campaign_id*(entry: TimestampRead): int64 =
  result = entry.session_audio_id.session_id.campaign_id.id


proc checkReadTimestampListPermission*(ctx: JWTContext, entries: seq[TimestampRead]) =
  let campaignName = ctx.getPathParamsOption(CAMPAIGN_NAME_PARAM).get()
  let campaign = getCampaignByName(campaignName)
  let hasCampaignMembership = ctx.tokenData.campaignMemberships.hasKey(campaign.id)
  if not hasCampaignMembership:
    raise newException(CampaignPermissionError, "You must be invited to a campaign to read its entries")