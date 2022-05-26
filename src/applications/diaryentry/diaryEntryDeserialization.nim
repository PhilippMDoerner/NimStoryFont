import diaryEntryModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "campaign": "campaign_id",
  "author": "author_id"
}.toTable()

createDeserializationHooks(DiaryEntry, JSON_TO_MODEL_FIELD_NAME_MAP)
