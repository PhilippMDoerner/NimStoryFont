import sessionaudioModel
import sessionaudioRepository
import ../genericArticleRepository
import tinypool
import norm/sqlite
import ../allUrlParams

export sessionaudioModel


proc getSessionAudioTimestamps*(sessionaudioId: int64): seq[Timestamp] =
    var sessionAudioShell: SessionAudio = newModel(SessionAudio)
    sessionAudioShell.id = sessionaudioId

    withDbConn(connection):
        result = connection.getManyFromOne(sessionAudioShell, Timestamp)

proc getSessionAudioByParams*(connection: DbConn, requestParams: ReadSessionAudioByParams): SessionAudioRead =
    result = connection.getSessionAudio(requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession)
