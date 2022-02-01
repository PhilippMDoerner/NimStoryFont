import norm/[model, pragmas]
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../session/sessionModel
import ../encounter/encounterModel
import std/options

type SessionAudio* {.defaults, tableName: SESSIONAUDIO_TABLE} = ref object of Model
  audio_file: string = ""
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id* {.fk: Session.}: int64 = MODEL_INIT_ID

implDefaults(SessionAudio)

proc newModel*(T: typedesc[SessionAudio]): SessionAudio = newSessionAudio()

type Timestamp* {.defaults, tableName: TIMESTAMP_TABLE} = ref object of Model
  name*: string = ""
  time*: Natural = 0
  encounter_id* {.fk: Encounter.}: Option[int64] = some(MODEL_INIT_ID)
  session_audio_id* {.fk: SessionAudio.}: int64 = MODEL_INIT_ID

implDefaults(Timestamp)
proc newModel*(T: typedesc[Timestamp]): Timestamp = newTimestamp()
