import userModel
import std/[json, tables, options]
include ../genericDeserialization

const JSON_TO_MODEL_FIELD_NAME_MAP: Table[string, string] = initTable[string, string]()


## PROCS FOR DESERIALIZING ENTRY CREATION JSON
proc renameHook*(v: var User, fieldName: var string) =
  ##  A jsony renameHook the converts fieldNames that differ between the 
  ## `deserializedType` and the actual fieldNames received in the json-string
  ## that shall be deserialized.
  if JSON_TO_MODEL_FIELD_NAME_MAP.hasKey(fieldName):
    fieldName = JSON_TO_MODEL_FIELD_NAME_MAP[fieldName]

proc newHook*(entry: var User) =
  ## A jsony newHook that provides default values for an article-model.
  ## These default values are the current DateTime for update- and creation
  ## date as well as "none" values for all Optional values of the Article.
  entry = new(User)
  let currentDateTime: DjangoDateTime = now()
  entry.date_joined = currentDateTime
  setOptionalsToNone[User](entry)

## PROC FOR DESERIALIZING ENTRY UPDATE JSON
proc deserializeEntry*(jsonStr: string, modelType: typedesc[User]): User = jsonStr.fromJson(User)

## PROC FOR DESERIALIZING ENTRY PATCHING JSON

proc updateEntryWithJson*[T: Model](entry: var User, json: JsonNode) =
  ## Modifies the given `entry` using the passed in `json`.  If a field exists on entry
  ## that also has a key-value pair in `json`, then that value will be copied from `json`
  ## into `entry`, overwriting whatever value was there before.
  const jsonToModelFieldNameMap = JSON_TO_MODEL_FIELD_NAME_MAP.invertTable()

  for modelFieldName, fieldValue in entry[].fieldPairs:
    const jsonFieldName = if jsonToModelFieldNameMap.hasKey(modelFieldName): jsonToModelFieldNameMap[modelFieldName] else: modelFieldName
    
    if json.hasKey(jsonFieldName):
      when fieldValue is Option:
        #fieldValue.T is the inner type of the Option type
        transferJsonValue(entry, modelFieldName, fieldValue.T, json[jsonFieldName])
      else:
        transferJsonValue(entry, modelFieldName, fieldValue.type(), json[jsonFieldName])

