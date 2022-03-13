import constructor/defaults
import ../../applicationConstants
import std/json

type UpdatedArticle* {.defaults.} = object
  table_name*: string = ""
  record_id*: int64 = MODEL_INIT_ID
  campaign_id*: int64 = MODEL_INIT_ID
  guid*: string = ""
implDefaults(UpdatedArticle)

proc newViewModel*(t: typedesc[UpdatedArticle]): UpdatedArticle = initUpdatedArticle()



type ContentUpdateSerializable* = JsonNode
