import norm/[model, pragmas]
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../session/sessionModel
import ../campaign/campaignModel


type SessionAudio* {.defaults, tableName: SESSIONAUDIO_TABLE} = ref object of Model
  audio_file*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id* {.fk: Session.}: int64 = MODEL_INIT_ID

implDefaults(SessionAudio)

proc newModel*(T: typedesc[SessionAudio]): SessionAudio = newSessionAudio()



type SessionAudioSession*{.defaults, tableName: SESSION_TABLE} = ref object of Model
  session_number*: int = -1
  is_main_session*: bool = true
  campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)

implDefaults(SessionAudioSession)

proc newModel*(T: typedesc[SessionAudioSession]): SessionAudioSession = newSessionAudioSession()



type SessionAudioRead* {.defaults, tableName: SESSIONAUDIO_TABLE} = ref object of Model
  audio_file*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id*: SessionAudioSession = newModel(SessionAudioSession)

implDefaults(SessionAudioRead)

proc newModel*(T: typedesc[SessionAudioRead]): SessionAudioRead = newSessionAudioRead()
