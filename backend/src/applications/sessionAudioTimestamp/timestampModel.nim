import norm/[model, pragmas]
import constructor/defaults
import ../../applicationSettings
import ../../applicationConstants
import ../campaign/campaignModel
import ../encounter/encounterModel
import std/options

type TimestampSession*{.defaults, readOnly, tableName: SESSION_TABLE.} = ref object of Model
  session_number*: int = -1
  is_main_session*: bool = true
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)

implDefaults(TimestampSession, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type TimestampSessionAudio*{.defaults, readOnly, tableName: SESSIONAUDIO_TABLE} = ref object of Model
  session_id*: TimestampSession = new(TimestampSession)
implDefaults(TimestampSessionAudio, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type Timestamp* {.defaults, tableName: TIMESTAMP_TABLE} = ref object of Model
  name*: string = ""
  time*: Natural = 0
  encounter_id* {.fk: Encounter.}: Option[int64] = some(MODEL_INIT_ID)
  session_audio_id* {.fk: TimestampSessionAudio.}: int64 = MODEL_INIT_ID

implDefaults(Timestamp, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type TimestampRead* {.defaults, readOnly, tableName: TIMESTAMP_TABLE} = ref object of Model
  name*: string = ""
  time*: Natural = 0
  encounter_id* {.fk: Encounter.}: Option[int64] = some(MODEL_INIT_ID)
  session_audio_id*:TimestampSessionAudio = new(TimestampSessionAudio)

implDefaults(TimestampRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
