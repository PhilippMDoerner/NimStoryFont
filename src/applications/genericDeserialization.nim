import norm/model
import std/[tables, options, json, typetraits, strutils, strformat, logging]
import ../utils/[djangoDateTime/djangoDateTimeType, macroUtils]
include genericUpdateDeserialization
import jsony

export jsony
export typetraits
export macroUtils
export logging
export djangoDateTimeType


proc invertTable*(table: Table[string, string]): Table[string, string] {.compileTime.} =
  for key, value in table.pairs:
    result[value] = key

template setOptionalsToNone[T: Model](entry: var T) =
  ## Takes an initialized model-type and sets all its optional fields to none()
  for fieldName, fieldValue in T()[].fieldPairs:
    when fieldValue is Option:
      entry.getField(fieldName) = none(fieldValue.get().type())

template createArticleDeserializationHooks*[T: Model](deserializedType: typedesc[T], modelToJsonFieldNameMap: Table[string, string]) =
  ## Creates an entire deserialization-module worth of jsony-hooks for the Model 
  ## `deserializedType`.
  
  ## PROCS FOR DESERIALIZING ENTRY CREATION JSON
  proc renameHook*(v: var T, fieldName: var string) =
    ##  A jsony renameHook the converts fieldNames that differ between the 
    ## `deserializedType` and the actual fieldNames received in the json-string
    ## that shall be deserialized.
    if modelToJsonFieldNameMap.hasKey(fieldName):
      fieldName = modelToJsonFieldNameMap[fieldName]
  
  proc newHook*(entry: var T) =
    ## A jsony newHook that provides default values for an article-model.
    ## These default values are the current DateTime for update- and creation
    ## date as well as "none" values for all Optional values of the Article.
    entry = new(deserializedType)
    let currentDateTime: DjangoDateTime = now()
    entry.creation_datetime = currentDateTime
    entry.update_datetime = currentDateTime
    setOptionalsToNone[T](entry)

  ## PROC FOR DESERIALIZING ENTRY UPDATE JSON
  proc deserializeEntry*[T: Model](jsonStr: string, modelType: typedesc[T]): T = jsonStr.fromJson(T)

  ## PROC FOR DESERIALIZING ENTRY PATCHING JSON

  proc updateEntryWithJson*[T: Model](entry: var T, json: JsonNode) =
    ## Modifies the given `entry` using the passed in `json`.  If a field exists on entry
    ## that also has a key-value pair in `json`, then that value will be copied from `json`
    ## into `entry`, overwriting whatever value was there before.
    const jsonToModelFieldNameMap = modelToJsonFieldNameMap.invertTable()

    for modelFieldName, fieldValue in entry[].fieldPairs:
      const jsonFieldName = if jsonToModelFieldNameMap.hasKey(modelFieldName): jsonToModelFieldNameMap[modelFieldName] else: modelFieldName
      
      if json.hasKey(jsonFieldName):
        when fieldValue is Option:
          #fieldValue.T is the inner type of the Option type
          transferJsonValue(entry, modelFieldName, fieldValue.T, json[jsonFieldName])
        else:
          transferJsonValue(entry, modelFieldName, fieldValue.type(), json[jsonFieldName])
