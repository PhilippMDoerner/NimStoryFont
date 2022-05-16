import markerModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "map": "map_id",
  "type": "type_id",
  "location": "location_id"
}.toTable()

createArticleDeserializationHooks(Marker, JSON_TO_MODEL_FIELD_NAME_MAP)
