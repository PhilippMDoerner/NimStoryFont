import campaignModel
import std/tables
import ../createDeserializationHookGenerator

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = initTable[string, string]()

createArticleDeserializationHooks(Campaign, JSON_TO_MODEL_FIELD_NAME_MAP)
