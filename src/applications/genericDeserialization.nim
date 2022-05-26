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

template setOptionalsToNone[T: Model](entry: var T) =
  ## Takes an initialized model-type and sets all its optional fields to none()
  for fieldName, fieldValue in T()[].fieldPairs:
    when fieldValue is Option:
      entry.getField(fieldName) = none(fieldValue.get().type())

template createDeserializationHooks*[T: Model](deserializedType: typedesc[T], modelToJsonFieldNameMap: Table[string, string]) =
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
