import timestampModel
import ../genericArticleRepository
import prologue
import ../../utils/jwtContext
import ../allUrlParams
import ../authentication/authenticationUtils
import std/[strutils]

proc campaign_id*(entry: Timestamp): int64 =
  result = getEntryById(entry.session_audio_id, TimestampSessionAudio).session_id.campaign_id.id

proc campaign_id*(entry: TimestampRead): int64 =
  result = entry.session_audio_id.session_id.campaign_id.id


proc checkReadTimestampListPermission*(ctx: JWTContext, entries: seq[TimestampRead]) =
  let campaignName = ctx.getPathParamsOption(CAMPAIGN_NAME_PARAM).get()
  let hasCampaignMembership = ctx.tokenData.campaignMemberships.hasKey(campaignName)
  if not hasCampaignMembership:
    raise newException(CampaignPermissionError, "You must be invited to a campaign to read its entries")