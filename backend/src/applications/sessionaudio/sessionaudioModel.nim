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

implDefaults(SessionAudio, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})





type SessionAudioSession*{.defaults, readOnly, tableName: SESSION_TABLE} = ref object of Model
  session_number*: int = -1
  is_main_session*: bool = true
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)

implDefaults(SessionAudioSession, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})





type SessionAudioRead* {.defaults, readOnly, tableName: SESSIONAUDIO_TABLE} = ref object of Model
  audio_file*: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id*: SessionAudioSession = new(SessionAudioSession)

implDefaults(SessionAudioRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


