import norm/model
import std/[tables, options, json, typetraits, strutils]
import ../utils/[djangoDateTime/djangoDateTimeType, macroUtils]

export macroUtils
export djangoDateTimeType

type Parseable = int | int64 | string | float | bool | DjangoDateTime | enum

template transferJsonIntValue(receiver: var Option[int], valueNode: JsonNode) =
  case valueNode.kind:
  of JsonNodeKind.JInt:
    receiver = some(valueNode.num.int)
  else:
    raise newException(JsonParsingError, fmt"The field {typeName}.{fieldName} expected the json to have an int-type, but the json was of kind '{valueNode.kind}'")

template transferJsonInt64Value(receiver: var Option[int64], valueNode: JsonNode) =
  case valueNode.kind:
  of JsonNodeKind.JInt:
    receiver = some(valueNode.num)
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
    when fieldType is int:
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