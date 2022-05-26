import locationModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "campaign": "campaign_id",
  "parent_location": "parent_location_id"
}.toTable()

createDeserializationHooks(Location, JSON_TO_MODEL_FIELD_NAME_MAP)
