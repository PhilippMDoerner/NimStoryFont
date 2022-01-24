
import macros, strutils, strformat
import typehelpers

export typehelpers

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
  result = newStmtList()
  var seqidx = 0
  for ty in tys:
    if (repr ty) == "nil": # Skip this type
      seqidx.inc
      continue

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
      for idx, el in ty.getTypeImpl[2].pairs:
        let ex = $ty & "." & toStrLit(el[0]).strval & " = "  & (repr se)  & "[" & $seqidx  & "]" & ".to" & el[1].strval.capitalizeAscii
        result.add parseStmt(ex)
        seqidx.inc
    of TyRefObj:
      for idx, el in tyy[2][2].pairs:
        let ex = $ty & "." & toStrLit(el[0]).strval & " = "  & (repr se)  & "[" & $seqidx  & "]" & ".to" & el[1].strval.capitalizeAscii
        result.add parseStmt(ex)
        seqidx.inc
    of TyRef:
      echo "REF OBJECT TYPE not implemented!"
      echo "https://github.com/status-im/nim-stew/blob/8a405309c660d1ceca8d505e340850e5b18f83a8/stew/shims/macros.nim#L184"
      echo "####"
      echo "end####"
    of TyTuple:
      for idx, el in ty.getTypeImpl.pairs:
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
  let tyName = $ty

  var sq = fmt"CREATE TABLE IF NOT EXISTS {tyName}(" & "\n"
  var lines: seq[string] = @[]
  let (kind, tyy) = gType(ty)
  case kind
  of TyObj:
    for idx, el in tyy[2].pairs:
      let name = toStrLit(el[0]).strval
      let nimType = el[1].strval
      let sqlType = nimType.mapToSqlType()
      var ex = fmt"{name} {sqlType} NOT NULL"
      lines.add ex
  else:
    echo "Unsupported"

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
  var sq = fmt"INSERT INTO {tyName}("
  var lines: seq[string] = @[]
  let (kind, tyy) = gType(ty)
  case kind
  of TyObj:
    for idx, el in tyy[2].pairs:
      lines.add $el[0]
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
  else:
    echo "Unsupported"
  return newLit(sq)

