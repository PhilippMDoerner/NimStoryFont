import std/[strformat, json]
import norm/[sqlite]
import ./sessionModel
import ./sessionSerialization
import ./sessionService
import ../campaign/campaignModel
import ../allUrlParams
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]

proc exportSessionData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignSessions =
    con.getCampaignSessions(ReadListParams(campaignName: campaign.name))
  let overviewSerializedSessions = con.overviewSerialize(campaignSessions)
  let overviewUrl = fmt"/session/{campaign.name}/overview/"
  result[overviewUrl] = %*overviewSerializedSessions

  let serializedSessions = con.serializeSessionReads(campaignSessions)
  let listUrl = fmt"/session/{campaign.name}/"
  result[listUrl] = %*serializedSessions

  for index, session in campaignSessions:
    let pkUrl = fmt"/session/pk/{session.id}/"
    let nameUrl =
      fmt"/session/{campaign.name}/{session.sessionNumber}/{session.isMainSession.int}/"
    let serializedDataNode = %*serializedSessions[index]
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
