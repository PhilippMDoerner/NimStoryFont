import std/algorithm
import ./sessionModel
import ./sessionRepository
import ../genericArticleRepository
import ../genericArticleService
import ../allUrlParams

export genericArticleRepository
export sessionModel

proc getSessionByParams*(
    connection: DbConn, requestParams: ReadSessionByParams
): SessionRead =
  result = connection.getSession(
    requestParams.campaignName, requestParams.sessionNumber,
    requestParams.isMainSession.bool,
  )

proc getCampaignSessions*(
    connection: DbConn, requestParams: ReadListParams
): seq[SessionRead] =
  var campaignSessions =
    readCampaignArticleList[ReadListParams, SessionRead](connection, requestParams)
  campaignSessions.reverse()
  result = campaignSessions
