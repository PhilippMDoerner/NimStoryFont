import markerTypeModel
import std/tables
import ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = initTable[string, string]()

createDeserializationHooks(MarkerType, JSON_TO_MODEL_FIELD_NAME_MAP)