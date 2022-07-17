import sessionModel
import ../genericArticleRepository
import ../genericArticleService
import sessionRepository
import ../allUrlParams
import std/algorithm

export genericArticleRepository
export sessionModel

proc getSessionByParams*(connection: DbConn, requestParams: ReadSessionByParams): SessionRead =
    result = connection.getSession(requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession.bool)

proc getCampaignSessions*(connection: DbConn, requestParams: ReadListParams): seq[SessionRead] = 
    var campaignSessions = readCampaignArticleList[ReadListParams, SessionRead](connection, requestParams)
    campaignSessions.reverse()
    result = campaignSessions