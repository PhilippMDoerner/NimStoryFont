import timestampModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "session_audio": "session_audio_id",
  "encounter": "encounter_id"
}.toTable()

proc renameHook*(v: var Timestamp, fieldName: var string) =
  ##  A jsony renameHook the converts fieldNames that differ between the 
  ## `deserializedType` and the actual fieldNames received in the json-string
  ## that shall be deserialized.
  if JSON_TO_MODEL_FIELD_NAME_MAP.hasKey(fieldName):
    fieldName = JSON_TO_MODEL_FIELD_NAME_MAP[fieldName]