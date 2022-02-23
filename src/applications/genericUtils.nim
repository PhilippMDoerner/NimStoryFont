##[
Documentation on generics:
  Model (Typically: M):
  A model is best thought of as a type containing the data from an SQL Query.
  In contrast to TableModels, which are a subset of Models, these are NOT
  necessarily an exact representation of the table in the database.
  Models can omit fields of the database table if they aren't wanted.
  Models can also have additional fields when data from other tables that are
  linked to the model's table via a foreign-key relationship is added.
  These models should only be used to read data from the database.
  
  TableModel (Typically: M): 
  A subset of Models. Thus, every TableModel is a Model, but not every Model 
  is a TableModel.
  A TableModel is an exact representation a database table. 
  Every field in the model is a column on that model's corresponding table and vice versa!
  This is relevant, as only TableModels may be used to delete, insert or update
  entries in the database.

  newModel: 
  Instantiates explicitly a Model
  
  newTableModel:
  Instantiates explicitly a TableModel
]##

import norm/[model, pragmas]
import std/[options, typetraits, tables, macros, sequtils, strformat]

##[Necessary in order to allow getting the table name of an Option[Model] type]##
proc table(model: Option[Model]): string =
  result = model.get().type().table()


macro getField(t: typed, fieldName: static string): untyped =
  ## Creates an expression "a.s", effectively handing you back the actual field with the given string name
  newDotExpr(t, ident(fieldName))

template hasField*(t: typed, fieldName: string): bool =
  ## Checks if a given type has a field with the given name
  compiles(getField(t, fieldName))


proc validateFkField*[S, T: Model](fkFieldName: static string, source: typedesc[S], target: typedesc[T]): bool {.compileTime.} =
  ## Checks at compile time whether the field with the name `fkFieldName` is a 
  ## valid foreign key field on the given `source` model to the table of the given 
  ## `target` model. 
  ## Specifically checks 1) if the field exists, 2) if it has either an fk pragma, 
  ## or is a model type or an option of a model type, and 3) if the table associated
  ## with that field is equivalent to that of the table of the `target` model.
  ## If any of these conditions are false, this proc will intentionally fail to compile
  const sourceName = name(S)
  const targetTableName = table(T)
  assert(S.hasField(fkFieldName), fmt "Tried using '{fkFieldName}' as FK field from Model '{sourceName}' to table '{targetTableName}' but there was no such field")

  for sourceFieldName, sourceFieldValue in source()[].fieldPairs:
    when sourceFieldName == fkFieldName:
      #Handles case where field is an int with fk pragma
      when sourceFieldValue.hasCustomPragma(fk):
        const fkFieldTable: string = sourceFieldValue.getCustomPragmaVal(fk).table()

      #Handles case where field is a Model type
      elif sourceFieldValue is Model:
        const fkFieldTable: string = sourceFieldValue.type.table()
      
      #Handles case where field is a Option[Model] type
      elif sourceFieldValue is Option:
        when sourceFieldValue.get() is Model:
          const fkFieldTable: string = sourceFieldValue.get().type.table()
        else:
          assert(false, fmt "Tried using '{fkFieldName}' as FK field from Model '{sourceName}' to table '{targetTableName}' but it was an option of a type that wasn't a model")

      #Fail at compile time if any other case occurs
      else:
        assert(false, fmt "Tried using '{fkFieldName}' as FK field from Model '{sourceName}' to table '{targetTableName}' but it didn't have an fk pragma and was neither a model type, nor an option of a model type")

      assert((targetTableName == fkFieldTable),  fmt "Tried using '{fkFieldName}' as FK field from Model '{sourceName}' to table '{targetTableName}' but the pragma pointed to a different table '{fkFieldTable}'")
      return true

  return false

func getRelatedFieldNameOn*[S: Model, T:Model](sourceType: typedesc[S], targetType: typedesc[T]): string {.compileTime.} =
    var fieldNames: seq[string] = @[]
    const targetTableName = T.table()

    for sourceFieldName, sourceFieldValue in S()[].fieldPairs:
        #Handles case where field is an int64 with fk pragma
        when sourceFieldValue.hasCustomPragma(fk):
            when targetTableName == sourceFieldValue.getCustomPragmaVal(fk).table():
                fieldNames.add(sourceFieldName)
        
        #Handles case where field is a Model type
        elif sourceFieldValue is Model:
            when targetTableName == sourceFieldValue.type().table():
                fieldNames.add(sourceFieldName)
        
        #Handles case where field is a Option[Model] type
        elif sourceFieldValue is Option:
            when sourceFieldValue.get() is Model:
                when targetTableName == genericParams(sourceFieldValue.type()).get(0).table():
                    fieldNames.add(sourceFieldName)

    const sourceModelName = name(S)
    assert(not (fieldNames.len() < 1), fmt "Tried getting foreign key field from model '{sourceModelName}' to model '{targetTableName}' but there is no such field!")
    assert(not (fieldNames.len() > 1), fmt "Can't infer foreign key field from model '{sourceModelName}' to model '{targetTableName}'! There is more than one foreign key field to that table! {fieldNames.len}")

    return fieldNames[0]



macro unpackFromJoinModel*[T: Model](mySeq: seq[T], field: static string): untyped =
  newCall(bindSym"mapIt", mySeq, nnkDotExpr.newTree(ident"it", ident field))

