import norm/[pragmas, model]
import std/[tables, options, json, typetraits, strutils]
import ../utils/[djangoDateTime/djangoDateTimeType, macroUtils]

export strutils
export macroUtils
export djangoDateTimeType

type Parseable = int | int64 | string | float | bool | DjangoDateTime | enum
type OutdatedDataError* = object of CatchableError

template transferJsonIntValue(receiver: var Option[untyped], valueNode: JsonNode) =
  case valueNode.kind:
  of JsonNodeKind.JInt:
    receiver = some(valueNode.num.int)
  of JsonNodeKind.JString:
    try:
      receiver = if valueNode.str == "": none(int) else: some(valueNode.str.parseInt())
    except ValueError:
      raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have an int-type and received a string. That string was '{valueNode.str}' and could not be parsed into a number")
  else:
    raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have an int-type, but the json was of kind '{valueNode.kind}'")


template transferJsonIntRangeValue[T: range](receiver: var Option[T], valueNode: JsonNode) =
  case valueNode.kind:
  of JsonNodeKind.JInt:
    let rangeNumber: T = valueNode.num.int
    receiver = some(rangeNumber)
  of JsonNodeKind.JString:
    try:
      let rangeNumber: T = valueNode.str.parseInt()
      receiver = if valueNode.str == "": none(typedesc[T]) else: some(rangeNumber)
    except ValueError:
      raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have an int-type and received a string. That string was '{valueNode.str}' and could not be parsed into a number")
  else:
    raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have an int-type, but the json was of kind '{valueNode.kind}'")


template transferJsonInt64Value(receiver: var Option[int64], valueNode: JsonNode) =
  case valueNode.kind:
  of JsonNodeKind.JInt:
    receiver = some(valueNode.num)
  of JsonNodeKind.JString:
    try:
      receiver = if valueNode.str == "": none(int64) else: some(valueNode.str.parseInt().int64)
    except ValueError:
      raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have an int-type and received a string. That string was '{valueNode.str}' and could not be parsed into a number")
  
  else:
    raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have an int64-type, but the json was of kind '{valueNode.kind}'")

template transferJsonStringValue(receiver: var Option[string], valueNode: JsonNode) =
  case valueNode.kind:
  of JsonNodeKind.JString:
    receiver = some(valueNode.str)
  else:
    raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have a string-type, but the json was of kind '{valueNode.kind}'")

template transferJsonBoolValue(receiver: var Option[bool], valueNode: JsonNode) =
  case valueNode.kind:
  of JsonNodeKind.JBool:
    receiver = some(valueNode.bval)
  of JsonNodeKind.JInt:
    if valueNode.num in 0..1:
      receiver = some(valueNode.num.bool)
    else:
      raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have a boolean-type or an int-value between 0 and 1. An int-value {valueNode.num} was received, but it was outside of that range!")

  else:
    raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have a boolean-type, but the json was of kind '{valueNode.kind}'")


template transferFloatValue(receiver: var Option[float], node: JsonNode) =
  case node.kind:
  of JsonNodeKind.JFloat:
    receiver = some(node.fnum)
  of JsonNodeKind.JInt:
    receiver = some(node.num.float)
  else:
    raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have a float-type, but the json was of kind '{valueNode.kind}'")

template transferDateTimeValue(receiver: var Option[DjangoDateTime], node: JsonNode) =
  case node.kind:
  of JsonNodeKind.JString:
    let parsedDateTime: DjangoDateTime = node.str.parseDefault()
    receiver = some(parsedDateTime)
  of JsonNodeKind.JInt:
    let parsedDateTime: DjangoDateTime = node.num.fromUnix()
    receiver = some(parsedDateTime)
  else:
    raise newException(JsonParsingError, fmt"The field '{typeName}.{fieldName}' expects a DjangoDateTime value, which must be parsed from either a DateTime-string or a unix timestamp. The json was of kind '{valueNode.kind}'" )

template transferEnumValue[T: enum](receiver: var Option[T], valueNode: JsonNode) =
  case valueNode.kind:
  of JsonNodeKind.JString:
    let enumVal: T = valueNode.str.parseEnum[:T]()
    receiver = some(enumVal)
  else:
    raise newException(JsonParsingError, fmt"The field '{typeName}.{fieldName}' expects an enum value, which must be parsed from a string. The json was of kind '{valueNode.kind}'" )


template moveValueIntoField[M: Model](entry: var M, fieldName: static string, value: Option[Parseable]) =
  when entry.getField(fieldName).type() is Option:
    entry.getField(fieldName) = value
  else:
    if value.isSome():
      entry.getField(fieldName) = value.get()
    else:
      raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have a value. But there was no value")



proc transferJsonValue[M: Model](entry: var M, fieldName: static string, fieldType: typedesc[Parseable], valueNode: JsonNode) =
  ## Takes the field `fieldName` on `entry` that has the type `fieldType` and transfers 
  ## the value from within `valueNode` into it. If necessary, the type of the value in
  ## `valueNode` will be converted to `fieldType`, should that operation be supported.
  var value: Option[fieldType]
  const typeName = name(M)

  if valueNode.kind == JsonNodeKind.JNull:
    when entry.getField(fieldName) is Option:
      value = none(fieldType)
    else:
      raise newException(JsonParsingError, fmt"Attempted to set the field {typeName}.{fieldName} to null, but it is not an optional type!")

  else:
    when fieldType is range:
      transferJsonIntRangeValue(value, valueNode)

    elif fieldType is int:
      transferJsonIntValue(value, valueNode)
    
    elif fieldType is int64:
      transferJsonInt64Value(value, valueNode)

    elif fieldType is string:
      transferJsonStringValue(value, valueNode)

    elif fieldType is bool:
      transferJsonBoolValue(value, valueNode)
      
    elif fieldType is float:
      transferFloatValue(value, valueNode)
    
    elif fieldType is DjangoDateTime:
      transferDateTimeValue(value, valueNode)

    elif fieldType is enum:
      transferEnumValue(value, valueNode)
  
  moveValueIntoField(entry, fieldName, value)



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




proc invertTable*(table: Table[string, string]): Table[string, string] {.compileTime.} =
  for key, value in table.pairs:
    result[value] = key

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
