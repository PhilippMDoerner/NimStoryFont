import sessionaudioModel
import ../base_generics/genericArticleRepository
import tinypool
import std/db_sqlite
export sessionaudioModel


proc getSessionAudioById*(sessionaudioId: int64): SessionAudio =
    result = getEntryById[SessionAudio](sessionaudioId)


proc getSessionAudioTimestamps*(sessionaudioId: int64): seq[Timestamp] =
    var sessionAudioShell: SessionAudio = newModel(SessionAudio)
    sessionAudioShell.id = sessionaudioId

    withDbConn(connection):
        result = connection.getManyFromOne(sessionAudioShell, Timestamp)