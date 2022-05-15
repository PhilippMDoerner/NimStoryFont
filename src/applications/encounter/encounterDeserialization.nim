import encounterModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "diaryentry": "diaryentry_id",
  "location": "location_id"
}.toTable()

createArticleDeserializationHooks(Encounter, JSON_TO_MODEL_FIELD_NAME_MAP)
