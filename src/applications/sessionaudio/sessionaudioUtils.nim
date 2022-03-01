import ../session/sessionModel
import sessionaudioModel
import ../genericArticleRepository

proc campaign_id*(sessionaudio: SessionAudio): int64 =
  result = getEntryById(sessionaudio.session_id, Session).campaign_id