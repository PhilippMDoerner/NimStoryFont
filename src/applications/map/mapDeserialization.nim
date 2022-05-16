import mapModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "campaign": "campaign_id",
}.toTable()

createArticleDeserializationHooks(Map, JSON_TO_MODEL_FIELD_NAME_MAP)
