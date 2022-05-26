import questModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "taker": "taker_id",
  "giver": "giver_id",
  "start_session": "start_session_id",
  "end_session": "end_session_id",
  "campaign": "campaign_id",
}.toTable()

createDeserializationHooks(Quest, JSON_TO_MODEL_FIELD_NAME_MAP)
