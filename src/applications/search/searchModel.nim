import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import constructor/defaults


type Search* {.defaults, tableName: SEARCH_TABLE.} = ref object of Model
  title*: string = ""
  title_rev*: string = ""
  body*: string = ""
  body_rev*: string = ""
  table_name*: string = ""
  record_id*: int64 = MODEL_INIT_ID
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
  guid*: string = ""
implDefaults(Search)

proc newModel*(T: typedesc[Search]): Search = newSearch()
proc newTableModel*(T: typedesc[Search]): Search = newSearch()

