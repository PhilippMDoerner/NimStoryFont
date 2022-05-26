import organizationModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = {
  "campaign": "campaign_id",
  "headquarter": "headquarter_id"
}.toTable()

createDeserializationHooks(Organization, JSON_TO_MODEL_FIELD_NAME_MAP)
