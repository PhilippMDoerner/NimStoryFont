import sessionaudioModel
import ../base_generics/genericArticleRepository

export sessionaudioModel

proc getSessionAudioById*(sessionaudioId: int64): SessionAudio =
    result = getEntryById[SessionAudio](sessionaudioId)
