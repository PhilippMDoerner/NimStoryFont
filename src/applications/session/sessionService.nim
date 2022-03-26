import sessionModel
import ../genericArticleRepository
import tinypool
import sessionRepository

export genericArticleRepository
export sessionModel

proc getSessionById*(sessionId: int64): SessionRead =
    result = getEntryById(sessionId, SessionRead)

proc getCampaignSessionListOverview*(campaignName: string): seq[Session] =
    result = getCampaignList(campaignName, Session)

proc getSerializedSession*(connection: DbConn, entry: Session): SessionRead =
    result = connection.getEntryById(entry.id, SessionRead)

proc getSessionByParams*(campaignName: string, sessionNumber: int, isMainSession: 0..1): SessionRead =
    result = getSession(campaignName, sessionNumber, isMainSession)