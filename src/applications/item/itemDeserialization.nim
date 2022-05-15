import itemModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "campaign": "campaign_id",
  "owner": "owner_id"
}.toTable()

createArticleDeserializationHooks(Item, JSON_TO_MODEL_FIELD_NAME_MAP)
