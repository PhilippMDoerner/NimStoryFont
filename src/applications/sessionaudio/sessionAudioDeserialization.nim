import sessionaudioModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "session": "session_id",
}.toTable()

createArticleDeserializationHooks(SessionAudio, JSON_TO_MODEL_FIELD_NAME_MAP)
