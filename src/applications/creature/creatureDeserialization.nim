import creatureModel
import std/tables
import ../createDeserializationHookGenerator

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "campaign": "campaign_id"
}.toTable()

createArticleDeserializationHooks(Creature, JSON_TO_MODEL_FIELD_NAME_MAP)
