import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import constructor/defaults
import std/tables

export campaignModel

type Search* {.defaults.} = object
  title*: string = ""
  title_rev*: string = ""
  body*: string = ""
  body_rev*: string = ""
  table_name*: string = ""
  record_id*: int64 = MODEL_INIT_ID
  campaign_id*: int64 = MODEL_INIT_ID
  guid*: string = ""
implDefaults(Search)

proc newModel*(T: typedesc[Search]): Search = initSearch()
proc newTableModel*(T: typedesc[Search]): Search = initSearch()


type SearchSerializable* {.defaults.} = object
  title*: string = ""
  guid*: string = ""
  campaign_id*: int64 = MODEL_INIT_ID
  record_id*: int64 = MODEL_INIT_ID
implDefaults(SearchSerializable)

proc newViewModel*(T: typedesc[SearchSerializable]): SearchSerializable = initSearchSerializable()