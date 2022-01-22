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

##[
    This generic repository allows general access to the database. It should be your ONLY way to
    modify the database through, do NOT write custom code for insert/update/delete procs. Always use the ones
    provided here.

    When modifying data, you have hooks available to insert your own code just before or after a
    create/delete/update operation occurs.

    These hooks are:
        - preCreateSignal(entryToCreate: T)
        - postCreateSignal(entryToCreate: T)
        - preDeleteSignal(entryToDelete: T)
        - postDeleteSignal(entryToDelete: T)
        - preUpdateSignal(entryToUpdate: T)
        - postUpdateSignal(entryToUpdate: T)

    To use them, merely define procs with the signature, T being the type of the model you pass to the
    insert/update/delete proc.
]##


proc getList*[M: Model](): seq[M] =
    ##[ Retrieves all rows/entries of a Model M from the database ]##
    mixin newModel

    var entryList: seq[M] = @[]
    entryList.add(newModel(M))

    withDbConn(connection):
        connection.selectAll(entryList)


    result = entryList


#TODO: Figure out how to infer the campaign_id field somehow
proc getCampaignList*[M: Model](campaignName: string): seq[M] =
    ##[ Retrieves all rows/entries of a campaign with the given name and 
    returns them as Model M. 
    
    ``campaignName`` must be exactly equal to the name of the targetted campaign,
    the comparison is case-sensitive.]##
    mixin newModel

    var entries: seq[M] = @[]
    entries.add(newModel(M))
    
    withDbConn(connection):
        connection.select(entries, "campaign_id.name = ?", campaignName)

    result = entries


proc getEntryByName*[M: Model](campaignName: string, entryName: string): M = 
    ##[ Retrieves a single row/entry of a Model M from the database, where
    the entry is from a campaign with the given name and itself has the given entryName.

    ``campaignName`` must be exactly equal to the name of the targetted campaign, 
    the comparison is case-sensitive.
    ``entryName`` must be exactly equal to the name of the targetted entry,
    the comparison is case-sensitive.]##
    mixin newModel
    
    var entry: M = newModel(M)
    
    const modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & ".name = ? AND campaign_id.name = ?"

    withDbConn(connection):
        connection.select(entry, sqlCondition, entryName, campaignName)

    result = entry


proc getEntryByField*[M: Model, T](fieldName: string, fieldValue: T): M = 
    ##[ Retrieves a single row/entry of a Model M from the database, where
    the entry is from a campaign with the given name and itself has the given entryName.

    ``campaignName`` must be exactly equal to the name of the targetted campaign, 
    the comparison is case-sensitive.
    ``entryName`` must be exactly equal to the name of the targetted entry,
    the comparison is case-sensitive.]##
    mixin newModel
    
    var entry: M = newModel(M)
    const modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & '.' & fieldName & "= ?"

    withDbConn(connection):
        connection.select(entry, sqlCondition, fieldValue)

    result = entry


proc getEntryById*[M: Model](entryId: int64): M =
    ##[ Retrieves a single row/entry of a Model M from the database, whose id matches the given id. ]##
    mixin newModel

    var targetEntry: M = newModel(M)
    const modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & ".id = ?"

    withDbConn(connection):
        connection.select(targetEntry, sqlCondition, entryId)

    result = targetEntry


proc getManyFromOne*[O: Model, M: Model](oneEntry: O, relatedManyType: typedesc[M]): seq[M] =
    mixin newModel


    var targetEntries: seq[relatedManyType] = @[newModel(relatedManyType)]
    const foreignKeyFieldName: string = O.getRelatedFieldNameOn(M)
    const manyTableName: string = M.table()
    let sqlCondition: string = manyTableName & "." & foreignKeyFieldName & " = ?"

    withDbConn(connection):
        connection.select(targetEntries, sqlCondition, oneEntry.id)

    result = targetEntries


proc getManyToMany*[M1: Model, J: Model, M2: Model](
    manyStartInstance: M1, 
    joinModel: typedesc[J], 
    otherManyModel: typedesc[M2]
): seq[M2] =
    mixin newModel

    var joinModelEntries: seq[joinModel] = @[newModel(joinModel)]

    const fkColumnFromJoinToManyStart: string = manyStartInstance.type().getRelatedFieldNameOn(J)
    const joinTableName = J.table()
    let sqlCondition: string = joinTableName & '.' & fkColumnFromJoinToManyStart & " = ?"

    withDbConn(connection):
        connection.select(joinModelEntries, sqlCondition, manyStartInstance.id)

    const fkColumnFromJoinToManyEnd = M2.getRelatedFieldNameOn(J)
    let manyEntries = unpackFromJoinModel(joinModelEntries, fkColumnFromJoinToManyEnd) 
    result = manyEntries


proc deleteEntry*[T: Model](entryId: int64) {.gcsafe.}=
    ##[ Deletes a row/an entry of a TableModel T with the given id.
    Uses norm's "delete" capabilities, thus the need to instantiate the TableModel]##
    mixin preDeleteSignal
    mixin postDeleteSignal

    var entryToDelete: T = getEntryById[T](entryId)

    when compiles(preDeleteSignal(entryToDelete)):
        preDeleteSignal(entryToDelete)


    {.cast(gcsafe).}:
      withDbConn(connection):
        connection.delete(entryToDelete)

    when compiles(postDeleteSignal(entryToDelete)):
        postDeleteSignal(entryToDelete)


proc updateEntry*[T: Model, M: Model](entryId: int64, entryJsonData: string): M =
    ##[ Replaces an entry of a given TableModel T with the data provided as a JSON string
    and returns a different representation of that entry via model M.

    If `entryJsonData` does not contain the id of the entry that shall be updated, 
    then the given entryId is used. Otherwise the id in the given entryJsonData is used.
    
    WARNING: ``T`` and ``M`` **must** be models for the same database table!]##
    var entry: T = entryJsonData.fromJson(T)
    entry.update_datetime = djangoDateTimeType.now() #TODO: This is a bad idea, not all models have this field, fix this

    if entry.id == 0:
        entry.id = entryId

    when compiles(preUpdateSignal(entry)):
        preUpdateSignal(entry)

    {.cast(gcsafe).}:
      withDbConn(connection):
        connection.update(entry)
      
    result = getEntryById[M](entry.id)

    when compiles(postUpdateSignal(result)):
        postUpdateSignal(result)


proc createEntry*[T: Model, M: Model](entryJsonData: string): M =
    ##[ Creates a new entry of a given TableModel T in the database
    and returns a different representation of that entry via model M.
    
    WARNING: ``T`` and ``M`` **must** be models for the same database table!]##
    var entry: T = entryJsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    when compiles(preCreateSignal(entry)):
        postUpdateSignal(entry)

    {.cast(gcsafe).}:
      withDbConn(connection):
        connection.insert(entry)

    result = getEntryById[M](entry.id)

    when compiles(postCreateSignal(result)):
        postUpdateSignal(result)
