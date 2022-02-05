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



proc checkFkField*[T: Model, M:Model](fromModelType: typedesc[T], fkFieldName: static string, toModelType: typedesc[M]): bool {.compileTime.} =
  const table = model.table #Keeps the table proc from norm available in all other instantiations of this proc
  const name = typetraits.name

  static: assert(T.hasField(fkFieldName), fmt "Tried using '{fkFieldName}' as FK field from Model '{name(T)}' to table '{M.table()}' but there was no such field")

  for sourceFieldName, sourceFieldValue in fromModelType()[].fieldPairs:
    when sourceFieldName == fkFieldName:
      static: assert(sourceFieldValue.hasCustomPragma(fk), fmt "Tried using '{fkFieldName}' as FK field from Model '{name(T)}' to table '{M.table()}' but it didn't have an fk pragma")
      
      const fkFieldTable: string = sourceFieldValue.getCustomPragmaVal(fk).table()
      static: assert((M.table() == fkFieldTable),  fmt "Tried using '{fkFieldName}' as FK field from Model '{name(T)}' to table '{M.table()}' but the pragma pointed to a different table '{fkFieldTable}'")
      
      return true

  return false

#TODO: For later, figure this out: To solve your issue with typetraits add bind genericParams into getRelatedFieldNameOn
proc getRelatedFieldNameOn*[M: Model](targetTableName: static string, sourceType: typedesc[M]): string {.compileTime.} =
    var fieldNames: seq[string] = @[]
    const name = typetraits.name
    
    for sourceFieldName, sourceFieldValue in M()[].fieldPairs:
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

    if fieldNames.len() == 1:
        return fieldNames[0]
    elif fieldnames.len() < 1:
        let errorMsg = fmt "Tried getting foreign key field from model '{name(M)}' to model '{targetTableName}' but there is no such field!"
        raise newException(FieldDefect, errorMsg)
    elif fieldnames.len() > 1:
        let errorMsg = fmt "Can't infer foreign key field from model '{name(M)}' to model '{targetTableName}'! There is more than one foreign key field to that table!"
        raise newException(FieldDefect, errorMsg)


proc getRelatedFieldNameOn*[M: Model, O:Model](targetType: typedesc[O], sourceType: typedesc[M]): string {.compileTime.} =
    result = getRelatedFieldNameOn(O.table(), sourceType)


macro unpackFromJoinModel*[T: Model](mySeq: seq[T], field: static string): untyped =
  newCall(bindSym"mapIt", mySeq, nnkDotExpr.newTree(ident"it", ident field))

