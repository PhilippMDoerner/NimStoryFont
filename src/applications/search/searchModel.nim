import ../campaign/campaignModel
import ../../applicationConstants
import constructor/defaults
import std/[json]

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


type SearchHit* {.defaults.} = object
  title*: string = ""
  table_name*: string = ""
  campaign_id*: int64 = MODEL_INIT_ID
  record_id*: int64 = MODEL_INIT_ID
implDefaults(SearchHit)

proc newViewModel*(T: typedesc[SearchHit]): SearchHit = initSearchHit()

type SearchSerializable* {.defaults.} = object
  hit*: SearchHit
  articleDataJson*: JsonNode
