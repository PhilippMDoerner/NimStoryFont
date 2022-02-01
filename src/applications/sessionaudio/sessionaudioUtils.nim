import ../session/sessionModel
import sessionaudioModel
import ../genericArticleRepository

proc campaign_id*(sessionaudio: SessionAudio): int64 =
  result = getEntryById[Session](sessionaudio.session_id).campaign_id