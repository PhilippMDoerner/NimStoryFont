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

