import sessionaudioModel
import sessionaudioRepository
import ../genericArticleRepository
import tinypool
import norm/sqlite
import ../allUrlParams

export sessionaudioModel


proc getSessionAudioByParams*(connection: DbConn, requestParams: ReadSessionAudioByParams): SessionAudioRead =
    result = connection.getSessionAudio(requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession)
