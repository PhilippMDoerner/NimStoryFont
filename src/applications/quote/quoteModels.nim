import norm/[model, pragmas]
import std/[options]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults
import ../character/characterModel


type QuoteSession* {.defaults, tableName: SESSION_TABLE.} = ref object of Model
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)
implDefaults(QuoteSession)
proc newModel*(T: typedesc[QuoteSession]): QuoteSession = newQuoteSession()

type QuoteEncounter* {.defaults, tableName: ENCOUNTER_TABLE.} = ref object of Model
implDefaults(QuoteEncounter)
proc newModel*(T: typedesc[QuoteEncounter]): QuoteEncounter = newQuoteEncounter()



type Quote* {.defaults, tableName: QUOTE_TABLE.} = ref object of Model
    quote*: string = ""
    description*: Option[string] = none(string) # A description of the character
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    session_id* {.fk: QuoteSession.}: int64 = MODEL_INIT_ID
    encounter_id* {.fk: QuoteEncounter.}: Option[int64] = some(MODEL_INIT_ID)

implDefaults(Quote)
proc newModel*(T: typedesc[Quote]): Quote = newQuote()
proc newTableModel*(T: typedesc[Quote]): Quote = newQuote()


type QuoteRead* {.defaults, tableName: QUOTE_TABLE.} = ref object of Model
    quote*: string = ""
    description*: Option[string] = none(string) # A description of the character
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    session_id*: QuoteSession = newModel(QuoteSession)
    encounter_id*: Option[QuoteEncounter] = some(newModel(QuoteEncounter))
implDefaults(QuoteRead)
proc newModel*(T: typedesc[QuoteRead]): QuoteRead = newQuoteRead()


type QuoteConnection* {.defaults, tableName: QUOTE_CHARACTER_TABLE.} = ref object of Model
  character_id*: Character = newModel(Character)
  quote_id*: QuoteRead = newModel(QuoteRead)
implDefaults(QuoteConnection)
proc newModel*(T: typedesc[QuoteConnection]): QuoteConnection = newQuoteConnection()