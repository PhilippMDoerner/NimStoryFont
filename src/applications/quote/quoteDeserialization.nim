import quoteModels
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "session": "session_id",
  "encounter": "encounter_id"
}.toTable()

createArticleDeserializationHooks(Quote, JSON_TO_MODEL_FIELD_NAME_MAP)
