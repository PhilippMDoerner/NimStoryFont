import norm/[pragmas, model]
import std/[tables, options, json, typetraits, strutils, strformat, logging, macros]
from std/times import toUnix
import ../utils/[djangoDateTime/djangoDateTimeType, macroUtils]
include genericUpdateDeserialization
import jsony

export jsony
export typetraits
export macroUtils
export logging
export djangoDateTimeType
export toUnix

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
    
    let currentDateTime: DjangoDateTime = djangoDateTimeType.now()
    when deserializedType.hasField("creation_datetime"):
      entry.creation_datetime = currentDateTime
    when deserializedType.hasField("update_datetime"):
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


proc addMapping(table: var Table[string, string], fieldName: string) {.compileTime.} =
  var jsonName = fieldName
  jsonName.removeSuffix("_id")
  table[jsonName] = fieldName

proc mapJsonToModelFieldNames[T: Model](modelType: typedesc[T]): Table[string, string] {.compileTime.} =  
  var mappings = initTable[string, string]()
  for sourceFieldName, sourceFieldValue in T()[].fieldPairs:
      #Handles case where field is an int64 with fk pragma
      when sourceFieldValue.hasCustomPragma(fk):
        mappings.addMapping(sourceFieldName)

      #Handles case where field is a Model type
      elif sourceFieldValue is Model:
        mappings.addMapping(sourceFieldName)
      
      #Handles case where field is a Option[Model] type
      elif sourceFieldValue is Option:
        when sourceFieldValue.get() is Model:
          mappings.addMapping(sourceFieldName)

  result = mappings


proc updateArticleWithJson*[T: Model](json: JsonNode, oldEntry: T): T = #TODO: Attach article type to this generic
  ## Modifies the given `entry` using the passed in `json`.  If a field exists on entry
  ## that also has a key-value pair in `json`, then that value will be copied from `json`
  ## into `entry`, overwriting whatever value was there before.
  const jsonToModelFieldNameMap: Table[string, string] = mapJsonToModelFieldNames(T).invertTable()
  result = oldEntry.deepCopy()
  let serverTimestamp: int64 = oldEntry.update_datetime.toTime().toUnix()

  for modelFieldName, fieldValue in result[].fieldPairs:
    const jsonFieldName = if jsonToModelFieldNameMap.hasKey(modelFieldName): jsonToModelFieldNameMap[modelFieldName] else: modelFieldName
    if json.hasKey(jsonFieldName):
      when fieldValue is Option:
        #fieldValue.T is the inner type of the Option type
        transferJsonValue(result, modelFieldName, fieldValue.T, json[jsonFieldName])
      else:
        transferJsonValue(result, modelFieldName, fieldValue.type(), json[jsonFieldName])

  let userTimestamp: int64 = result.update_datetime.toTime().toUnix()
  let isBasedOnOutdatedUserData = userTimestamp < serverTimestamp
  let hasChanges = oldEntry != result
  if isBasedOnOutdatedUserData and hasChanges:
    raise newException(OutdatedDataError, "Tried updating a database entry that with data that has already been changed by another user!")



proc updateEntryWithJson*[T: Model](json: JsonNode, oldEntry: T): T =
  ## Modifies the given `entry` using the passed in `json`.  If a field exists on entry
  ## that also has a key-value pair in `json`, then that value will be copied from `json`
  ## into `entry`, overwriting whatever value was there before.
  const jsonToModelFieldNameMap: Table[string, string] = mapJsonToModelFieldNames(T).invertTable()

  result = oldEntry.deepCopy()

  for modelFieldName, fieldValue in result[].fieldPairs:
    const jsonFieldName = if jsonToModelFieldNameMap.hasKey(modelFieldName): jsonToModelFieldNameMap[modelFieldName] else: modelFieldName
    
    if json.hasKey(jsonFieldName):
      when fieldValue is Option:
        #fieldValue.T is the inner type of the Option type
        transferJsonValue(result, modelFieldName, fieldValue.T, json[jsonFieldName])
      else:
        transferJsonValue(result, modelFieldName, fieldValue.type(), json[jsonFieldName])
