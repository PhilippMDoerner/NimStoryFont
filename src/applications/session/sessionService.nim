import sessionModel
import ../genericArticleRepository
import tinypool
import sessionRepository
import ../allUrlParams

export genericArticleRepository
export sessionModel

proc getSessionById*(sessionId: int64): SessionRead =
    result = getEntryById(sessionId, SessionRead)

proc getCampaignSessionListOverview*(campaignName: string): seq[Session] =
    result = getCampaignList(campaignName, Session)

proc getSerializedSession*(connection: DbConn, entry: Session): SessionRead =
    result = connection.getEntryById(entry.id, SessionRead)

proc getSessionByParams*(connection: DbConn, requestParams: ReadSessionByParams): SessionRead =
    result = connection.getSession(requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession.bool)