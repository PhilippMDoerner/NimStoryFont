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


proc getRelatedFieldName[M: Model, O:Model](targetType: typedesc[O], sourceType: typedesc[M]): Option[string] =
    let source = sourceType()
    for sourceFieldName, sourceFieldValue in source[].fieldPairs:
        #Handles case where field is an int64 with fk pragma
        when sourceFieldValue.hasCustomPragma(fk):
            when O.table() == sourceFieldValue.getCustomPragmaVal(fk).table():
                return some(sourceFieldName)
        
        #Handles case where field is a Model type
        when sourceFieldValue is Model:
            when O.table() == sourceFieldValue.type().table():
                return some(sourceFieldName)
        
        #Handles case where field is a Option[Model] type
        when sourceFieldValue is Option:
            when sourceFieldValue.get() is Model:
                when O.table() == genericParams(sourceFieldValue.type()).get(0).table():
                    return some(sourceFieldName) 

    return none(string)


proc getForeignKeyFieldNameOn*[M: Model, O:Model](oneModel: typedesc[O], manyModel: typedesc[M]): string =
    let fieldOption: Option[string] = getRelatedFieldName(oneModel, manyModel)
    if fieldOption.isNone():
        let errorMsg = "Tried getting foreign key field from model '" & name(manyModel) & "' to model '" & name(oneModel) & "' but there is no such field!"
        raise newException(FieldDefect, errorMsg)
    
    return fieldOption.get()


# template unpackFromJoinModel*[T: Model](joinModelSeq: seq[T], foreignKeyField: untyped): untyped = 
#     result = mySeq.mapIt(it.foreignKeyField)


macro unpackFromJoinModel*[T: Model](mySeq: seq[T], field: static string): untyped =
    newCall(bindSym"mapIt", mySeq, nnkDotExpr.newTree(ident"it", ident field))


##[I want to figure out the foreign-key fieldnames to both table A and table B from table C]##
proc getManyToManyRelationship*[M1: Model, M2: Model, J: Model](manyModel1: typedesc[M1], manyModel2: typedesc[M2], joinModel: typedesc[J]): Table[string, string] =
    let joinTableName = joinModel.table()
    let fk1ColumnName = getForeignKeyFieldNameOn(M1, J)
    let fk2ColumnName = getForeignKeyFieldNameOn(M2, J)

    result = {name(manyModel1): fk1ColumnName, name(manyModel2): fk2ColumnName}.toTable

