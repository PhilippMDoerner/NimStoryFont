import norm/model
import std/[tables, options]
import ../utils/[djangoDateTime/djangoDateTimeType, macroUtils]

export macroUtils

template setOptionalsToNone[T: Model](entry: var T) =
  ## Takes an initialized model-type and sets all its optional fields to none()
  for fieldName, fieldValue in T()[].fieldPairs:
    when fieldValue is Option:
      entry.getField(fieldName) = none(fieldValue.get().type())


template createArticleDeserializationHooks*[T: Model](deserializedType: typedesc[T], renameTable: Table[string, string]) =
  ## Creates an entire deserialization-module worth of jsony-hooks for the Model 
  ## `deserializedType`.
  
  proc renameHook*(v: var T, fieldName: var string) =
    ##  A jsony renameHook the converts fieldNames that differ between the 
    ## `deserializedType` and the actual fieldNames received in the json-string
    ## that shall be deserialized.
    if renameTable.hasKey(fieldName):
      fieldName = renameTable[fieldName]
  
  proc newHook*(entry: var T) =
    ## A jsony newHook that provides default values for an article-model.
    ## These default values are the current DateTime for update- and creation
    ## date as well as "none" values for all Optional values of the Article.
    entry = new(deserializedType)
    let currentDateTime: DjangoDateTime = now()
    entry.creation_datetime = currentDateTime
    entry.update_datetime = currentDateTime
    setOptionalsToNone[T](entry)