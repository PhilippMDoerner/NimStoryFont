import spellModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "campaign": "campaign_id",
  "player_class": "player_class_id",
  "spell": "spell_id"
}.toTable()

createDeserializationHooks(Spell, JSON_TO_MODEL_FIELD_NAME_MAP)

proc renameHook*(v: var SpellConnection, fieldName: var string) =
  ##  A jsony renameHook the converts fieldNames that differ between the 
  ## `deserializedType` and the actual fieldNames received in the json-string
  ## that shall be deserialized.
  if JSON_TO_MODEL_FIELD_NAME_MAP.hasKey(fieldName):
    fieldName = JSON_TO_MODEL_FIELD_NAME_MAP[fieldName]
