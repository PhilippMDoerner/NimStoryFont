import std/[macros]
import norm/[model, pragmas]
import ../character/characterModel
import ../quest/questModel

## This is a first draft for a concept to replace "checkFkField" sot that it doesn't have to be explicitly called
## it does, in the "withModel" concept, 3 checks: has the field, has the fk pragma on that field, and has the tablename in the fk pragma that you want

macro toIdent(a: typed, s: static string): untyped =
  ## Generates an expression "a.s"
  newDotExpr(a, ident(s))

macro toIdent(a: typed): untyped =
  ## ???
  ident(a.repr)

template hasCustomPragma(field, templ: typed): bool =
  ## ???
  macros.hasCustomPragma(field, templ)

template getTableName*(field: typed): untyped =
  ## Needed as directly calling this in the concept will explode for some reason
  when field.hasCustomPragma(fk):
    field.getCustomPragmaVal(fk).table()
  else:
    ""

proc sameTableName*(tableName, comp: static string): bool {.compileTime.} =
  result = tableName == comp

type ModelWith*[Field: static string, ModelType] {.explain.} =
  concept model
      model.toIdent(Field) # Checks if field with name in "Field" is present
      hasCustomPragma(model.toIdent(Field), fk)
        # Checks if field with name in "Field" has the custom pragma "fk"
      model.toIdent(Field).getTableName().sameTableName(ModelType.table())
        # Checks if field with name in "Field" has fk pragma with the same tablename as the model in "ModelType"
