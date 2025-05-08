import std/[options]
import norm/[model, pragmas]
import constructor/defaults
import ../campaign/campaignModel
import ../character/characterModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType

type QuoteSession* {.defaults, readOnly, tableName: SESSION_TABLE.} = ref object of Model
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)

implDefaults(QuoteSession, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type QuoteEncounter* {.defaults, readOnly, tableName: ENCOUNTER_TABLE.} = ref object of Model
implDefaults(QuoteEncounter, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type Quote* {.defaults, tableName: QUOTE_TABLE.} = ref object of Model
  quote*: string = ""
  description*: Option[string] = none(string) # A description of the character
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id* {.fk: QuoteSession.}: int64 = MODEL_INIT_ID
  encounter_id* {.fk: QuoteEncounter.}: Option[int64] = some(MODEL_INIT_ID)

implDefaults(Quote, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type QuoteRead* {.defaults, readOnly, tableName: QUOTE_TABLE.} = ref object of Model
  quote*: string = ""
  description*: Option[string] = none(string) # A description of the character
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id*: QuoteSession = new(QuoteSession)
  encounter_id*: Option[QuoteEncounter] = some(new(QuoteEncounter))

implDefaults(QuoteRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type QuoteConnection* {.defaults, tableName: QUOTE_CHARACTER_TABLE.} = ref object of Model
  character_id* {.fk: QuoteSession.}: int64 = MODEL_INIT_ID
  quote_id* {.fk: QuoteSession.}: int64 = MODEL_INIT_ID

implDefaults(QuoteConnection, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type QuoteConnectionRead* {.defaults, readOnly, tableName: QUOTE_CHARACTER_TABLE.} = ref object of Model
  character_id*: Character = new(Character)
  quote_id*: QuoteRead = new(QuoteRead)

implDefaults(QuoteConnectionRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
