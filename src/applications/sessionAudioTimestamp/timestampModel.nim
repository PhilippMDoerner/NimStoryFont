import norm/[model, pragmas]
import constructor/defaults
import ../../applicationSettings
import ../../applicationConstants
import ../campaign/campaignModel
import ../encounter/encounterModel
import std/options

type TimestampSession*{.defaults, tableName: SESSION_TABLE.} = ref object of Model
  session_number*: int = -1
  is_main_session*: bool = true
  campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)

implDefaults(TimestampSession)
proc newModel*(T: typedesc[TimestampSession]): TimestampSession = newTimestampSession()

type TimestampSessionAudio*{.defaults, tableName: SESSIONAUDIO_TABLE} = ref object of Model
  session_id*: TimestampSession = newModel(TimestampSession)
implDefaults(TimestampSessionAudio)
proc newModel*(T: typedesc[TimestampSessionAudio]): TimestampSessionAudio = newTimestampSessionAudio()


type Timestamp* {.defaults, tableName: TIMESTAMP_TABLE} = ref object of Model
  name*: string = ""
  time*: Natural = 0
  encounter_id* {.fk: Encounter.}: Option[int64] = some(MODEL_INIT_ID)
  session_audio_id* {.fk: TimestampSessionAudio.}: int64 = MODEL_INIT_ID

implDefaults(Timestamp)
proc newModel*(T: typedesc[Timestamp]): Timestamp = newTimestamp()


type TimestampRead* {.defaults, tableName: TIMESTAMP_TABLE} = ref object of Model
  name*: string = ""
  time*: Natural = 0
  encounter_id* {.fk: Encounter.}: Option[int64] = some(MODEL_INIT_ID)
  session_audio_id*:TimestampSessionAudio = newModel(TimestampSessionAudio)

implDefaults(TimestampRead)
proc newModel*(T: typedesc[TimestampRead]): TimestampRead = newTimestampRead()