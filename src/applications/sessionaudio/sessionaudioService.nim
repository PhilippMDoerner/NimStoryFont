import sessionaudioModel
import sessionaudioRepository
import ../genericArticleRepository
import tinypool
import norm/sqlite
import ../allUrlParams

export sessionaudioModel


proc getSessionAudioById*(sessionaudioId: int64): SessionAudio =
    result = getEntryById(sessionaudioId, SessionAudio)


proc getSessionAudioTimestamps*(sessionaudioId: int64): seq[Timestamp] =
    var sessionAudioShell: SessionAudio = newModel(SessionAudio)
    sessionAudioShell.id = sessionaudioId

    withDbConn(connection):
        result = connection.getManyFromOne(sessionAudioShell, Timestamp)


proc getCampaignSessionAudioListOverview*(campaignName: string): seq[SessionAudio] =
    ## lists all campaign entries using a limited but performant representation of a SessionAudio
    result = getCampaignList(campaignName, SessionAudio)

proc getSessionAudioSerialization*(connection: DbConn, entry: SessionAudio): SessionAudioRead {.gcsafe.}=
    result = connection.getEntryById(entry.id, SessionAudioRead)

proc getSessionAudioByParams*(connection: DbConn, requestParams: ReadSessionAudioByParams): SessionAudioRead =
    result = connection.getSessionAudio(requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession)
