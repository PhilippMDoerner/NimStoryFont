import std/[macros, sequtils]
import norm/model

macro getField*(obj: Model, fieldName: static string): untyped =
  nnkDotExpr.newTree(obj, ident(fieldName))

macro getField*[T](someType: typedesc[T], fieldName: static string): untyped =
  nnkDotExpr.newTree(someType, ident(fieldName))

template setField*(obj: var Model, fieldName: static string, value: untyped) =
  obj.getField(fieldName) = value

proc hasField*[T](obj: T, fieldName: static string): bool {.compileTime.} =
  result = compiles(obj.getField(fieldName))

proc hasField*[T](t: typedesc[T], fieldName: static string): bool {.compileTime.} =
  result = compiles(T().getField(fieldName))

macro unpackFromJoinModel*[T: Model](mySeq: seq[T], field: static string): untyped =
  ## A macro to "extract" a field of name `field` out of the model in `mySeq`, 
  ## creating a new seq of whatever type the field called `field` has.
  newCall(bindSym"mapIt", mySeq, nnkDotExpr.newTree(ident"it", ident field))
