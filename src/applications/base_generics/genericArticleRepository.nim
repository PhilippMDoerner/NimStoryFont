import ../../utils/database
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType, serialization]
import norm/[model, sqlite]
import jsony

export sqlite
export serialization
export normConversion

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
    
    let modelTableName: string = M.table()
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
    
    let modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & '.' & fieldName & "= ?"
    db.select(entry, sqlCondition, fieldValue)

    result = entry


proc getEntryById*[M: Model](entryId: int64): M =
    ##[ Retrieves a single row/entry of a Model M from the database, whose id matches the given id. ]##
    mixin newModel

    let db = getDatabaseConnection()
    var targetEntry: M = newModel(M)
    
    let modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & ".id = ?"
    db.select(targetEntry, sqlCondition, entryId)

    result = targetEntry


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