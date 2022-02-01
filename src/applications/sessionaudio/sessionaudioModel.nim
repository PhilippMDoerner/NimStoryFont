import norm/[model, pragmas]
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../session/sessionRepository


type SessionAudio* {.defaults, tableName: SESSIONAUDIO_TABLE} = ref object of Model
  audio_file: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id* {.fk: Session.}: int64 = MODEL_INIT_ID

implDefaults(SessionAudio)

proc newModel*(T: typedesc[SessionAudio]): SessionAudio = newSessionAudio()
