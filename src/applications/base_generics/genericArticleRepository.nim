import ../../utils/database
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType, serialization]
import norm/[model, sqlite]
import jsony
import options
import genericUtils

export sqlite
export serialization
export normConversion
export jsony

proc getList*[M: Model](): seq[M] =
    ##[ Retrieves all rows/entries of a Model M from the database ]##
    mixin newModel
    bind select

    let db = getDatabaseConnection()
    var entryList: seq[M] = @[]
    entryList.add(newModel(M))

    db.selectAll(entryList)

    result = entryList


#TODO: Figure out how to infer the campaign_id field somehow
proc getCampaignList*[M: Model](campaignName: string): seq[M] =
    ##[ Retrieves all rows/entries of a campaign with the given name and 
    returns them as Model M. 
    
    ``campaignName`` must be exactly equal to the name of the targetted campaign,
    the comparison is case-sensitive.]##
    mixin newModel

    let db = getDatabaseConnection()
    var entries: seq[M] = @[]
    entries.add(newModel(M))
    
    db.select(entries, "campaign_id.name = ?", campaignName)

    result = entries


proc getEntryByName*[M: Model](campaignName: string, entryName: string): M = 
    ##[ Retrieves a single row/entry of a Model M from the database, where
    the entry is from a campaign with the given name and itself has the given entryName.

    ``campaignName`` must be exactly equal to the name of the targetted campaign, 
    the comparison is case-sensitive.
    ``entryName`` must be exactly equal to the name of the targetted entry,
    the comparison is case-sensitive.]##
    mixin newModel
    
    let db = getDatabaseConnection()
    var entry: M = newModel(M)
    
    const modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & ".name = ? AND campaign_id.name = ?"
    db.select(entry, sqlCondition, entryName, campaignName)

    result = entry


proc getEntryByField*[M: Model, T](fieldName: string, fieldValue: T): M = 
    ##[ Retrieves a single row/entry of a Model M from the database, where
    the entry is from a campaign with the given name and itself has the given entryName.

    ``campaignName`` must be exactly equal to the name of the targetted campaign, 
    the comparison is case-sensitive.
    ``entryName`` must be exactly equal to the name of the targetted entry,
    the comparison is case-sensitive.]##
    mixin newModel
    
    let db = getDatabaseConnection()
    var entry: M = newModel(M)
    
    const modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & '.' & fieldName & "= ?"
    db.select(entry, sqlCondition, fieldValue)

    result = entry


proc getEntryById*[M: Model](entryId: int64): M =
    ##[ Retrieves a single row/entry of a Model M from the database, whose id matches the given id. ]##
    mixin newModel

    let db = getDatabaseConnection()
    var targetEntry: M = newModel(M)
    
    const modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & ".id = ?"
    db.select(targetEntry, sqlCondition, entryId)

    result = targetEntry



##TODO: You want to not narrow this down to a specific type. You want to check if the field value is a Model type
##TODO: Then you want to check if that model type's table is the type of table you're looking for

##[What I need: 
    1) The starter table name that the other field should point to (instance.tablename())
    2) A model of that other table that contains a Model-Field of this table (TableModel will do or just a model with the FK annotated with the 'fk' pragma)
    3) An id on that starter table (instance.id)
]##
proc getManyFromOne*[O: Model, M: Model](oneEntry: O, relatedManyType: typedesc[M]): seq[M] =
    mixin newModel

    let db: DbConn = getDatabaseConnection()

    var targetEntries: seq[relatedManyType] = @[newModel(relatedManyType)]

    const foreignKeyFieldName: string = oneEntry.type().getForeignKeyFieldNameOn(relatedManyType)
    const manyTableName: string = relatedManyType.table()
    let sqlCondition: string = manyTableName & "." & foreignKeyFieldName & " = ?"

    db.select(targetEntries, sqlCondition, oneEntry.id)

    result = targetEntries


proc getManyToMany*[M1: Model, J: Model, M2: Model](
    manyStartInstance: M1, 
    joinModel: typedesc[J], 
    otherManyModel: typedesc[M2]
): seq[M2] =
    mixin newModel

    let db = getDatabaseConnection()
    var joinModelEntries: seq[joinModel] = @[newModel(joinModel)]

    const fkColumnFromJoinToManyStart: string = manyStartInstance.type().getRelatedFieldNameOn(J)
    const joinTableName = J.table()
    let sqlCondition: string = joinTableName & '.' & fkColumnFromJoinToManyStart & " = ?"
    db.select(joinModelEntries, sqlCondition, manyStartInstance.id)

    const fkColumnFromJoinToManyEnd = M2.getRelatedFieldNameOn(J)
    let manyEntries = unpackFromJoinModel(joinModelEntries, fkColumnFromJoinToManyEnd) 
    result = manyEntries


proc deleteEntry*[T: Model](entryId: int64) {.gcsafe.}=
    ##[ Deletes a row/an entry of a TableModel T with the given id.
    Uses norm's "delete" capabilities, thus the need to instantiate the TableModel]##
    mixin newTableModel

    let db = getDatabaseConnection()

    var entryToDelete: T = newTableModel(T)
    entryToDelete.id = entryId

    db.delete(entryToDelete)  


proc updateEntry*[T: Model, M: Model](entryId: int64, entryJsonData: string): M {.gcsafe.} =
    ##[ Replaces an entry of a given TableModel T with the data provided as a JSON string
    and returns a different representation of that entry via model M.

    If `entryJsonData` does not contain the id of the entry that shall be updated, 
    then the given entryId is used. Otherwise the id in the given entryJsonData is used.
    
    WARNING: ``T`` and ``M`` **must** be models for the same database table!]##
    let db = getDatabaseConnection()

    var entry: T = entryJsonData.fromJson(T)
    entry.update_datetime = djangoDateTimeType.now()

    if entry.id == 0:
        entry.id = entryId

    db.update(entry)

    result = getEntryById[M](entry.id)


proc createEntry*[T: Model, M: Model](entryJsonData: string): M {.gcsafe.} =
    ##[ Creates a new entry of a given TableModel T in the database
    and returns a different representation of that entry via model M.
    
    WARNING: ``T`` and ``M`` **must** be models for the same database table!]##
    let db = getDatabaseConnection()
    var entry: T = entryJsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    db.insert(entry)

    result = getEntryById[M](entry.id)