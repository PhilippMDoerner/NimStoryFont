import ../utils/djangoDateTime/[normConversion, djangoDateTimeType, serialization]
import ../utils/databaseUtils
import norm/[model, sqlite]
import jsony
import std/[options, strformat]
import genericUtils
import tinypool
import core/[signalSystem]

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


# SELECT PROCS
proc getList*[M: Model](connection: MyDbConn): seq[M] =
    ##[ Retrieves all rows/entries of a Model M from the database ]##
    mixin newModel

    var entryList: seq[M] = @[]
    entryList.add(newModel(M))

    connection.selectAll(entryList)

    result = entryList

proc getList*[M: Model](): seq[M] =
    ##[ Helper proc for getList when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getList[M](connection)



#TODO: Figure out how to infer the campaign_id field somehow
proc getCampaignList*[M: Model](connection: MyDbConn, campaignName: string): seq[M] =
    ##[ Retrieves all rows/entries of a campaign with the given name and 
    returns them as Model M. 
    
    ``campaignName`` must be exactly equal to the name of the targetted campaign,
    the comparison is case-sensitive.]##
    mixin newModel

    var entries: seq[M] = @[]
    entries.add(newModel(M))
    
    connection.select(entries, "campaign_id.name = ?", campaignName)

    result = entries

proc getCampaignList*[M: Model](campaignName: string): seq[M] =
    ##[ Helper proc for getCampaignList when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getCampaignList[M](connection, campaignName)



proc getEntryByName*[M: Model](connection: MyDbConn, campaignName: string, entryName: string): M = 
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

    connection.select(entry, sqlCondition, entryName, campaignName)

    result = entry

proc getEntryByName*[M: Model](campaignName: string, entryName: string): M = 
    ##[ Helper proc for getEntryByName when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getEntryByName[M](connection, campaignName, entryName)



proc getEntryByField*[M: Model, T](connection: MyDbConn, fieldName: string, fieldValue: T): M = 
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

    connection.select(entry, sqlCondition, fieldValue)

    result = entry 

proc getEntryByField*[M: Model, T](fieldName: string, fieldValue: T): M = 
    ##[ Helper proc for getEntryByField when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getEntryByField[M](connection, fieldName, fieldValue)



proc getEntryById*[M: Model](connection: MyDbConn, entryId: int64): M =
    ##[ Retrieves a single row/entry of a Model M from the database, whose id matches the given id. ]##
    mixin newModel

    var targetEntry: M = newModel(M)
    const modelTableName: string = M.table()
    var sqlCondition: string = modelTableName & ".id = ?"

    connection.select(targetEntry, sqlCondition, entryId)

    result = targetEntry

proc getEntryById*[M: Model](entryId: int64): M =
    ##[ Helper proc for getEntryById when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getEntryById[M](connection, entryId)



proc getManyFromOne*[O: Model, M: Model](connection: MyDbConn, oneEntry: O, relatedManyType: typedesc[M], manyTypeforeignKeyFieldName: static string): seq[M] =
    ## manyTypeforeignKeyFieldName = Name of the foreign key field on the Many Type
    mixin newModel

    const _ = checkFkField(M, manyTypeforeignKeyFieldName, O) # temp is irrelevant, this only stands here for the compile time check of checkFkField

    var targetEntries: seq[relatedManyType] = @[newModel(relatedManyType)]
    const manyTableName: string = M.table()
    const sqlCondition: string = manyTableName & "." & manyTypeforeignKeyFieldName & " = ?"

    connection.select(targetEntries, sqlCondition, oneEntry.id)

    result = targetEntries

proc getManyFromOne*[O: Model, M: Model](connection: MyDbConn, oneEntry: O, relatedManyType: typedesc[M]): seq[M] =
    ##[ Helper proc for getManyFromOne when you don't want to specify the related FK field since there is only one ]##
    const foreignKeyFieldName: string = O.getRelatedFieldNameOn(M)
    result = getManyFromOne(connection, oneEntry, relatedManyType, foreignKeyFieldName)

proc getManyFromOne*[O: Model, M: Model](oneEntry: O, relatedManyType: typedesc[M], manyTypeforeignKeyFieldName: static string): seq[M] =
    ##[ Helper proc for getManyFromOne when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getManyFromOne[O, M](connection, oneEntry, relatedManyType, manyTypeforeignKeyFieldName)

proc getManyFromOne*[O: Model, M: Model](oneEntry: O, relatedManyType: typedesc[M]): seq[M] =
    ##[ Helper proc for getManyFromOne when you don't want to provide neither the connection yourself, nor the FK Field]##
    withDbConn(connection):
        result = getManyFromOne[O, M](connection, oneEntry, relatedManyType)



proc getManyToMany*[M1: Model, J: Model, M2: Model](
    connection: MyDbConn,
    manyStartInstance: M1, 
    joinModel: typedesc[J], 
    otherManyModel: typedesc[M2]
): seq[M2] =
    mixin newModel

    var joinModelEntries: seq[joinModel] = @[newModel(joinModel)]

    const fkColumnFromJoinToManyStart: string = manyStartInstance.type().getRelatedFieldNameOn(J)
    const joinTableName = J.table()
    let sqlCondition: string = joinTableName & '.' & fkColumnFromJoinToManyStart & " = ?"

    connection.select(joinModelEntries, sqlCondition, manyStartInstance.id)

    const fkColumnFromJoinToManyEnd = M2.getRelatedFieldNameOn(J)
    let manyEntries = unpackFromJoinModel(joinModelEntries, fkColumnFromJoinToManyEnd) 
    result = manyEntries

proc getManyToMany*[M1: Model, J: Model, M2: Model](
    manyStartInstance: M1, 
    joinModel: typedesc[J], 
    otherManyModel: typedesc[M2]
): seq[M2] =
    ##[ Helper proc for getManyToMany when you don't want to provide the connection yourself]##
    withDbConn(connection):
        getManyToMany[M1, J, M2](connection, manyStartInstance, joinModel, otherManyModel)



#DELETE PROCS
proc deleteEntry*[T: Model](entryId: int64) {.gcsafe.}=
    ##[ Deletes a row/an entry of a TableModel T with the given id.
    Uses norm's "delete" capabilities, thus the need to instantiate the TableModel]##
    mixin preDeleteSignal
    mixin postDeleteSignal

    var entryToDelete: T = getEntryById[T](entryId)

    withDbTransaction(connection):
        {.cast(gcsafe).}:
            triggerSignal(SignalType.stPreDelete, connection, entryToDelete)
    
            connection.delete(entryToDelete)

            triggerSignal(SignalType.stPostDelete, connection, entryToDelete)



#UPDATE PROCS
proc updateEntry*[T: Model](entry: var T): T =
    ##[ Replaces an entry of a given TableModel T with the data provided as a JSON string
    and returns a different representation of that entry via model M.

    If `entryJsonData` does not contain the id of the entry that shall be updated, 
    then the given entryId is used. Otherwise the id in the given entryJsonData is used.
    
    WARNING: ``T`` and ``M`` **must** be models for the same database table!]##

    withDbTransaction(connection):
        {.cast(gcsafe).}:
            triggerSignal(SignalType.stPreUpdate, connection, entry)

            connection.update(entry)
        
            triggerSignal(SignalType.stPostUpdate, connection, entry)

        result = entry


proc updateEntry*[T: Model](entryId: int64, entryJsonData: string): T =
    var entry: T = entryJsonData.fromJson(T)
    if entry.id == 0:
        entry.id = entryId

    result = updateEntry(entry)

proc updateArticleEntry*[T: Model](entryId: int64, entryJsonData: string): T =
    var entry: T = entryJsonData.fromJson(T)
    entry.update_datetime = djangoDateTimeType.now()

    if entry.id == 0:
        entry.id = entryId

    result = updateEntry(entry)

#CREATE PROCS
proc createEntry*[T: Model](entry: var T): T =
    ##[ Core proc to insert an entry of Model `T` into its associated table.
    Triggers preCreateSignal and postCreateSignal if there are any defined for the model ]##
    
    withDbTransaction(connection):
        {.cast(gcsafe).}:
            triggerSignal(SignalType.stPreCreate, connection, entry)

            connection.insert(entry)

            triggerSignal(SignalType.stPostCreate, connection, entry)

        result = entry

proc createEntryInTransaction*[T: Model](connection: DbConn, entry: var T): T =
    ##[ Core proc to insert an entry of Model `T` into its associated table.
    Triggers preCreateSignal and postCreateSignal if there are any defined for the model ]##

    connection.insert(entry)
    triggerSignal(SignalType.stPostCreate, connection, entry)
    result = entry

proc createEntry*[T: Model](entryJsonData: string): T =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and want to provide your own connection ]##

    var entry: T = entryJsonData.fromJson(T)
    result = createEntry(entry)



proc createArticleEntry*[T: Model](entryJsonData: string): T =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and the model is an Article, which means creation and updateTime need to 
    be set accordingly. You can provide your own connection here]##
    var entry: T = entryJsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    result = createEntry(entry)
