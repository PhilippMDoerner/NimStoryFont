# TODO
# DONE bool
# DONE ref object
# DONE to macro "nil" should skip
# TODO defaults and modifiers for the create macros with custom pragmas
# Beef: Depending on what you want you could use disruptek's assume package which has typeit allowing you to iterate fields of objects
# Beef: https://github.com/disruptek/assume/blob/master/tests/typeit.nim#L102-L199

import macros, strutils, strformat
import typehelpers

proc toString*(str: string): string = str
# proc toString*(str: ref string): string = str[]
proc toFloat*(str: string): float {.inline.} = parseFloat(str)
proc toInt*(str: string): int {.inline.} = parseInt(str)
proc toInt64*(str: string): int64 {.inline.} = str.toInt().int64
proc toBool*(str: string): bool {.inline.} = parseBool(str)
proc toChar*(str: string): char {.inline.} = str[0]

template defaultValue*(def: string | int | float) {.pragma.} ## does not work yet :/
# template defaultValue*() {.pragma.}

macro to*(se: untyped, tys: varargs[typed]): typed =
  ## a generic seq/openarray unpacker.
  runnableExamples:
    type Obj = object
      bb: int
      cc: bool
    var se = ["1337","somethingToSkip", "foo", "1", "true"]
    var id: int
    var obj = Obj()
    se.to(id, nil, obj)
    assert obj.aa == "foo"
    assert obj.bb == 1
    assert obj.cc == true
  result = newStmtList()
  var seqidx = 0
  for ty in tys:
    if (repr ty) == "nil": # Skip this type
      seqidx.inc
      continue
    # echo "####"
    # echo treeRepr(ty.getTypeImpl())
    # echo "end####"
    # echo $ty.gType & "##############################"
    let (kind, tyy) = ty.gType
    case kind
    of TyString:
      let ex = $ty & " = "  & (repr se)  & "[" & $seqidx  & "]"  & ".toString"
      result.add parseStmt(ex)
      seqidx.inc
    of TyInt:
      let ex = $ty & " = "  & (repr se)  & "[" & $seqidx  & "]"  & ".toInt"
      result.add parseStmt(ex)
      seqidx.inc
    of TyInt64:
      let ex = $ty & " = "  & (repr se)  & "[" & $seqidx  & "]"  & ".toInt64"
      result.add parseStmt(ex)
      seqidx.inc
    of TyBool:
      let ex = $ty & " = "  & (repr se)  & "[" & $seqidx  & "]"  & ".toBool"
      result.add parseStmt(ex)
      seqidx.inc
    of TyFloat:
      let ex = $ty & " = "  & (repr se)  & "[" & $seqidx  & "]"  & ".toFloat"
      result.add parseStmt(ex)
      seqidx.inc
    of TyObj:
      for idx, el in tyy.pairs:
        let ex = $ty & "." & toStrLit(el[0]).strval & " = "  & (repr se)  & "[" & $seqidx  & "]" & ".to" & el[1].strval.capitalizeAscii
        result.add parseStmt(ex)
        seqidx.inc
    of TyRefObj:
      for idx, el in tyy.pairs:
        let ex = $ty & "." & toStrLit(el[0]).strval & " = "  & (repr se)  & "[" & $seqidx  & "]" & ".to" & el[1].strval.capitalizeAscii
        result.add parseStmt(ex)
        seqidx.inc
    of TyRef:
      echo "REF OBJECT TYPE not implemented!"
      echo "https://github.com/status-im/nim-stew/blob/8a405309c660d1ceca8d505e340850e5b18f83a8/stew/shims/macros.nim#L184"
      echo "####"
      # echo repr ty.getType()[1]
      # echo treeRepr(ty.getType().getType())
      # echo treeRepr(ty.symToIdent) #.getType().getType().getTypeImpl())
      # echo repr ty.getTypeImpl().getTypeImpl().getTypeImpl() #getImplTransformed()
      echo "end####"
    of TyTuple:
      for idx, el in tyy.pairs:
        let ex = $ty & "." & toStrLit(el[0]).strval & " = "  & (repr se)  & "[" & $seqidx  & "]" & ".to" & el[1].strval.capitalizeAscii
        result.add parseStmt(ex)
        seqidx.inc
    of TyUnsupported:
      echo "Unsupported!"

proc mapToSqlType*(nimType: string): string =
  ## Maps nim type to sql type.
  case nimType.toLowerAscii()
  of "int": return "INTEGER"
  of "float": return "REAL"
  of "string": return "TEXT"
  of "bool": return "BOOLEAN"
  else: return "TEXT"


macro ct*(ty: typed, mapping: proc(nimType: string): string = mapToSqlType): string =
  ## create table macro
  # echo "####"
  # echo treeRepr ty
  # echo ty.hasCustomPragma(defaultValue)
  # echo treeRepr ty.getTypeInst
  # echo ty.getTypeInst.hasCustomPragma(defaultValue)
  # echo "CT###################### ", repr $ty.gType()
  let tyName = $ty

  var lines: seq[string] = @[]
  let (kind, tyy) = gType(ty)
  case kind
  of TyObj, TyRefObj, TyTuple:
    echo treeRepr(tyy)
    for idx, el in tyy.pairs:
      let name = toStrLit(el[0]).strval
      let nimType = el[1].strval
      let sqlType = nimType.mapToSqlType()
      var ex = fmt"{name} {sqlType} NOT NULL"
      # echo "HAS CUSTOM PRAGMA:", hasCustomPragma(el[0][1], defaultValue)
      # echo "EX  ", ex
      lines.add ex
  else:
    echo "Unsupported"

  var sq = fmt"CREATE TABLE IF NOT EXISTS {tyName}(" & "\n"
  sq &=  "\t" & "id INTEGER PRIMARY KEY,\n"
  for idx, line in lines.pairs():
    sq &= "\t" & line
    if idx < lines.len - 1:
      sq &= ","
    sq &= "\n"
  sq &= ");"
  return newLit(sq)


macro ci*(ty: typed): string =
  ## create insert
  # INSERT INTO Foo (first, second, third, forth) VALUES (?, ?, ?, ?)
  let tyName = $ty
  var lines: seq[string] = @[]
  let (kind, tyy) = gType(ty)
  case kind
  of TyObj, TyTuple, TyRefObj:
    for idx, el in tyy.pairs:
      lines.add $el[0]
  else:
    echo "Unsupported"
    return

  var sq = fmt"INSERT INTO {tyName}("
  for idx, line in lines.pairs:
    sq &= line
    if idx < lines.len - 1:
      sq &= ", "
  sq &= ") VALUES ("
  for idx, _ in lines.pairs:
    sq &= "?"
    if idx < lines.len - 1:
      sq &= ", "
  sq &= ")"
  return newLit(sq)

