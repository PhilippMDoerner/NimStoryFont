import characterModel
import std/tables
import ../genericDeserialization

const RENAMED_CREATE_INPUT: Table[string, string] = {
  "organization": "organization_id", 
  "current_location": "current_location_id", 
  "campaign": "campaign_id"
}.toTable()

createArticleDeserializationHooks(Character, RENAMED_CREATE_INPUT)
