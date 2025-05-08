import std/[strformat, json]
import norm/[sqlite]
import ./diaryEntryModel
import ./diaryEntrySerialization
import ./diaryEntryService
import ../campaign/campaignModel
import ../allUrlParams
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]

proc exportDiaryentryData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignDiaryentrys =
    con.getCampaignDiaryEntries(ReadListParams(campaignName: campaign.name))
  let overviewSerializeddiaryentrys = con.overviewSerialize(campaignDiaryentrys)
  let overviewUrl = fmt"/diaryentry/{campaign.name}/overview/"
  result[overviewUrl] = %*overviewSerializeddiaryentrys

  for diaryentry in campaignDiaryentrys:
    let url =
      fmt"/diaryentry/{campaign.name}/{diaryentry.sessionId.sessionNumber}/{diaryentry.sessionId.isMainSession.int}/{diaryentry.authorId.username}/"
    let serializedData = con.serializeDiaryentryRead(diaryentry)
    result[url] = %*serializedData
