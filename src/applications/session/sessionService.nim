import sessionModel
import ../genericArticleRepository
import tinypool
import sessionRepository
import ../allUrlParams

export genericArticleRepository
export sessionModel

proc getSessionByParams*(connection: DbConn, requestParams: ReadSessionByParams): SessionRead =
    result = connection.getSession(requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession.bool)