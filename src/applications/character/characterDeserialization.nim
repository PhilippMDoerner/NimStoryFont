import characterModel
import std/tables
import ../createDeserializationHookGenerator

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "organization": "organization_id", 
  "current_location": "current_location_id", 
  "campaign": "campaign_id"
}.toTable()

createArticleDeserializationHooks(Character, JSON_TO_MODEL_FIELD_NAME_MAP)
