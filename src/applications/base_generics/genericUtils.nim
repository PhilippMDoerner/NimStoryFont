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
import std/[options, typetraits, tables, macros, sequtils]

##[Necessary in order to allow getting the table name of an Option[Model] type]##
proc table(model: Option[Model]): string =
  result = model.get().type().table()


proc getRelatedFieldNameOn*[M: Model](targetTableName: static string, sourceType: typedesc[M]): static string =
    for sourceFieldName, sourceFieldValue in M()[].fieldPairs:
        #Handles case where field is an int64 with fk pragma
        when sourceFieldValue.hasCustomPragma(fk):
            when targetTableName == sourceFieldValue.getCustomPragmaVal(fk).table():
                return sourceFieldName
        
        #Handles case where field is a Model type
        when sourceFieldValue is Model:
            when targetTableName == sourceFieldValue.type().table():
                return sourceFieldName
        
        #Handles case where field is a Option[Model] type
        when sourceFieldValue is Option:
            when sourceFieldValue.get() is Model:
                when targetTableName == genericParams(sourceFieldValue.type()).get(0).table():
                    return sourceFieldName

    let errorMsg = "Tried getting foreign key field from model '" & name(sourceType) & "' to model '" & targetTableName & "' but there is no such field!"
    raise newException(FieldDefect, errorMsg)


proc getRelatedFieldNameOn*[M: Model, O:Model](targetType: typedesc[O], sourceType: typedesc[M]): static string =
    result = getRelatedFieldNameOn(O.table(), sourceType)


macro unpackFromJoinModel*[T: Model](mySeq: seq[T], field: static string): untyped =
  newCall(bindSym"mapIt", mySeq, nnkDotExpr.newTree(ident"it", ident field))

