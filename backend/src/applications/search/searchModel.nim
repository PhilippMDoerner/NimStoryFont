import std/[json]
import constructor/defaults
import ../campaign/campaignModel
import ../../applicationConstants

export campaignModel

type Search* {.defaults.} = ref object
  title*: string = ""
  title_rev*: string = ""
  body*: string = ""
  body_rev*: string = ""
  table_name*: string = ""
  record_id*: int64 = MODEL_INIT_ID
  record*: string = ""
  campaign_id*: int64 = MODEL_INIT_ID
  guid*: string = ""

implDefaults(Search, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type SearchHit* {.defaults.} = ref object
  title*: string = ""
  table_name*: string = ""
  campaign_id*: int64 = MODEL_INIT_ID
  record_id*: int64 = MODEL_INIT_ID
  record*: string = ""

implDefaults(SearchHit, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type SearchSerializable* = JsonNode
