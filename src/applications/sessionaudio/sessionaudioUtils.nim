import ../session/[sessionUtils, sessionModel]
import sessionaudioModel
import ../genericArticleRepository
import std/[strformat]
import ../../utils/jwtContext
import ../authentication/authenticationUtils

proc `$`*(entry: SessionAudioSession): string =
  result.add(if entry.is_main_session: "Main" else: "Side")
  result.add(fmt" Session {entry.session_number}")

proc `$`*(entry: SessionAudioRead): string =
  result = fmt"Audio of {$entry.session_id}"

proc campaign_id*(sessionaudio: SessionAudio): int64 =
  result = getEntryById(sessionaudio.session_id, Session).campaign_id

proc campaign_id*(sessionaudio: SessionAudioRead): int64 =
  result = sessionaudio.session_id.campaign_id.id


proc checkSessionAudioReadListPermission*(ctx: JWTContext, entries: seq[SessionAudioRead | SessionAudio]) =
  checkCampaignReadListPermission(ctx, entries)