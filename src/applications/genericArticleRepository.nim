import ../utils/djangoDateTime/[normConversion, djangoDateTimeType, serialization]
import ../utils/[macroUtils, databaseUtils]
import norm/[model, sqlite]
import jsony
import std/[options, strformat, sequtils, sugar, strutils, tables]
import core/[signalSystem]

export sqlite
export serialization
export normConversion
export jsony

##[
    This generic repository allows general access to the database. It should be your ONLY way to
    modify the database through, do NOT write custom code for insert/update/delete procs. Always use the ones
    provided here.
]##


# SELECT PROCS
proc getList*[M: Model](connection: MyDbConn, modelType: typedesc[M]): seq[M] =
    ##[ Retrieves all rows/entries of a Model M from the database ]##
    mixin newModel

    var entryList: seq[M] = @[]
    entryList.add(newModel(M))

    connection.selectAll(entryList)

    result = entryList

proc getList*[M: Model]( modelType: typedesc[M]): seq[M] =
    ##[ Helper proc for getList when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getList[M](connection, modelType)



#TODO: Figure out how to infer the campaign_id field somehow
proc getCampaignList*[M: Model](connection: MyDbConn, campaignName: string, modelType: typedesc[M]): seq[M] =
    ##[ Retrieves all rows/entries of a campaign with the given name and 
    returns them as Model M. 
    
    ``campaignName`` must be exactly equal to the name of the targetted campaign,
    the comparison is case-sensitive.]##
    mixin newModel

    var entries: seq[M] = @[]
    entries.add(newModel(M))
    
    let queryParams: array[1, DbValue] = [campaignName.dbValue()]
    connection.select(entries, "campaign_id.name LIKE ?", queryParams)

    result = entries

proc getCampaignList*[M: Model](campaignName: string, modelType: typedesc[M]): seq[M] =
    ##[ Helper proc for getCampaignList when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getCampaignList[M](connection, campaignName, modelType)



proc getEntryByName*[M: Model](connection: MyDbConn, campaignName: string, entryName: string, modelType: typedesc[M]): M = 
    ##[ Retrieves a single row/entry of a Model M from the database, where
    the entry is from a campaign with the given name and itself has the given entryName.

    ``campaignName`` must be exactly equal to the name of the targetted campaign, 
    the comparison is case-sensitive.
    ``entryName`` must be exactly equal to the name of the targetted entry,
    the comparison is case-sensitive.]##
    mixin newModel
    
    var entry: M = newModel(M)
    
    const modelTableName: string = M.table()
    var sqlCondition: string = fmt "{modelTableName}.name LIKE ? AND campaign_id.name LIKE ?"
    
    let queryParams: array[2, DbValue] = [entryName.dbValue(), campaignName.dbValue()]
    connection.select(entry, sqlCondition, queryParams)

    result = entry

proc getEntryByName*[M: Model](campaignName: string, entryName: string, modelType: typedesc[M]): M = 
    ##[ Helper proc for getEntryByName when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getEntryByName[M](connection, campaignName, entryName, modelType)


proc getEntryByField*[M: Model, T](connection: MyDbConn, fieldName: string, fieldValue: T, modelType: typedesc[M]): M = 
    ##[ Retrieves a single row/entry of a Model M from the database, where
    the entry is from a campaign with the given name and itself has the given entryName.

    ``campaignName`` must be exactly equal to the name of the targetted campaign, 
    the comparison is case-sensitive.
    ``entryName`` must be exactly equal to the name of the targetted entry,
    the comparison is case-sensitive.]##
    mixin newModel
    
    var entry: M = newModel(M)
    const modelTableName: string = M.table()
    var sqlCondition: string = fmt "{modelTableName}.{fieldName} = ?"

    connection.select(entry, sqlCondition, fieldValue)

    result = entry 


proc getEntryByField*[M: Model, T](fieldName: string, fieldValue: T, modelType: typedesc[M]): M = 
    ##[ Helper proc for getEntryByField when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getEntryByField[M](connection, fieldName, fieldValue, modelType)


#TODO: Make it so entryId does not have to be inserted via formatting
proc getEntryById*[M: Model](connection: MyDbConn, entryId: int64, modelType: typedesc[M]): M =
    ##[ Retrieves a single row/entry of a Model M from the database, whose id matches the given id. ]##
    mixin newModel

    var targetEntry: M = newModel(M)
    const modelTableName: string = M.table()
    var sqlCondition: string = fmt"{modelTableName}.id = ?"

    let queryParams: array[1, DbValue] = [dbValue(entryId)]
    connection.select(targetEntry, sqlCondition, queryParams)

    result = targetEntry

proc getEntryById*[M: Model](entryId: int64, modelType: typedesc[M]): M =
    ##[ Helper proc for getEntryById when you don't want to provide the connection yourself]##
    withDbConn(connection):
        result = getEntryById[M](connection, entryId, modelType)



proc getManyFromOne*[O: Model, M: Model](connection: MyDbConn, oneEntry: O, relatedManyType: typedesc[M], manyTypeforeignKeyFieldName: static string): seq[M] =
    ## manyTypeforeignKeyFieldName = Name of the foreign key field on the Many Type
    mixin newModel
    var targetEntries: seq[relatedManyType] = @[newModel(relatedManyType)]

    connection.selectOneToMany(oneEntry, targetEntries, manyTypeforeignKeyFieldName)

    result = targetEntries

proc getManyFromOne*[O: Model, M: Model](connection: MyDbConn, oneEntries: seq[O], relatedManyType: typedesc[M], manyTypeforeignKeyFieldName: static string): Table[int64, seq[M]] =
    mixin newModel
    let entryIds: seq[int64] = oneEntries.map(entry => entry.id)

    let idString = entryIds.map(id => id.int.intToStr()).join(",")
    let condition = fmt"{relatedManyType.table()}.{manyTypeforeignKeyFieldName} IN ({idString})"

    var targetEntries: seq[relatedManyType] = @[newModel(relatedManyType)]
    connection.select(targetEntries, condition)

    for entryId in entryIds:
        let id = entryId
        result[entryId] = targetEntries.filter(target => target.getField(manyTypeforeignKeyFieldName).id == id)


proc getManyFromOne*[O: Model, M: Model](connection: MyDbConn, oneEntry: O, relatedManyType: typedesc[M]): seq[M] =
    ##[ Helper proc for getManyFromOne when you don't want to specify the related FK field since there is only one ]##
    mixin newModel
    var targetEntries: seq[relatedManyType] = @[newModel(relatedManyType)]

    connection.selectOneToMany(oneEntry,  targetEntries)
    result = targetEntries

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
    queryStartEntries: seq[M1], 
    joinModel: typedesc[J], 
    otherManyModel: typedesc[M2], 
    fkColumnFromJoinToManyStart: static string, 
    fkColumnFromJoinToManyEnd: static string
): Table[int64, seq[M2]] =
    mixin newModel
    var joinModelEntries: seq[joinModel] = @[newModel(joinModel)]
    var queryEndEntries: seq[M2] = @[newModel(otherManyModel)]

    let queryStartEntryIds: seq[int64] = queryStartEntries.map(entry => entry.id)

    let idString = queryStartEntryIds.map(id => id.int.intToStr()).join(",")
    const joinTableName = J.table()
    let sqlCondition: string = fmt"{joinTableName}.{fkColumnFromJoinToManyStart} IN ({idString})"
    
    connection.select(joinModelEntries, sqlCondition)

    for entryId in queryStartEntryIds:
        let id = entryId
        result[entryId] = joinModelEntries.filter(joinEntry => joinEntry.getField(fkColumnFromJoinToManyEnd).id == id)


proc getManyToMany*[M1: Model, J: Model, M2: Model](
    connection: MyDbConn, 
    queryStartEntry: M1, 
    joinModel: typedesc[J], 
    otherManyModel: typedesc[M2], 
    fkColumnFromJoinToManyStart: static string, 
    fkColumnFromJoinToManyEnd: static string
): seq[M2] =    
  ## Fetches the many-to-many relationship for the entry `queryStartEntry` and
  ## returns a seq of all entries connected to `queryStartEntry` in `queryEndEntries`. 
  ## Requires to also be passed the model connecting the many-to-many relationship
  ## via `joinModelEntries`in order to fetch the relationship. Also requires the
  ## field on the joinModel that points to the table of `queryStartEntry`
  ## via the parameter `fkColumnFromJoinToManyStart`. Also requires the field field on
  ## the joinModel that points to the table of `queryEndEntries` via the parameter
  ## `fkColumnFromJoinToManyEnd`.
  ## Will not compile if the specified fields on the joinModel do not properly point
  ## to the tables of `queryStartEntry` and `queryEndEntries`.
  mixin newModel

  var joinModelEntries: seq[joinModel] = @[newModel(joinModel)]
  var queryEndEntries: seq[M2] = @[newModel(otherManyModel)]

  connection.selectManyToMany(queryStartEntry, joinModelEntries, queryEndEntries)

  result = queryEndEntries

proc getManyToMany*[M1: Model, J: Model, M2: Model](
    connection: MyDbConn, 
    queryStartEntry: M1, 
    joinModel: typedesc[J], 
    otherManyModel: typedesc[M2]
): seq[M2] =   
  ## A convenience proc. Fetches the many-to-many relationship for the entry 
  ## `queryStartEntry` and returns a seq of all entries connected to `queryStartEntry` 
  ## in `queryEndEntries`. Requires to also be passed the model connecting the 
  ## many-to-many relationship via `joinModelEntries`in order to fetch the relationship.
  ## The fields on `joinModelEntries` to use for these queries are inferred. 
  ## Will only compile if the joinModel has exactly one field pointing to 
  ## the table of `queryStartEntry` as well as exactly one field pointing to 
  ## the table of `queryEndEntries`. Specify the parameters `fkColumnFromJoinToManyStart`
  ## and `fkColumnFromJoinToManyEnd` if that is not the case.
  mixin newModel
  
  var joinModelEntries: seq[J] = @[newModel(joinModel)]
  var queryEndEntries: seq[M2] = @[newModel(otherManyModel)]

  connection.selectManyToMany(queryStartEntry, joinModelEntries, queryEndEntries)
  
  result = queryEndEntries


proc getManyToMany*[M1: Model, J: Model, M2: Model](
    manyStartInstance: M1, 
    joinModel: typedesc[J], 
    otherManyModel: typedesc[M2]
): seq[M2] =
    ##[ Helper proc for getManyToMany when you don't want to provide the connection yourself]##
    withDbConn(connection):
        getManyToMany[M1, J, M2](connection, manyStartInstance, joinModel, otherManyModel)



#DELETE PROCS
proc deleteEntryInTransaction*[T: Model](connection: MyDbConn, entry: var T) =
    ##[ Core proc to insert an entry of Model `T` into its associated table.
    Triggers preCreateSignal and postCreateSignal if there are any defined for the model ]##
    triggerSignal(SignalType.stPreDelete, connection, entry)
    
    connection.delete(entry)
    

proc deleteEntryInTransaction*[T: Model](connection: MyDbConn, entryId: int64, modelType: typedesc[T]) =
    ##[ Core proc to insert an entry of Model `T` into its associated table.
    Triggers preCreateSignal and postCreateSignal if there are any defined for the model ]##
    var entryToDelete = connection.getEntryById(entryId, modelType)
    connection.deleteEntryInTransaction(entryToDelete)
    

proc deleteEntry*[T: Model](entryId: int64, modelType: typedesc[T]) {.gcsafe.}=
    ##[ Deletes a row/an entry of a TableModel T with the given id.
    Uses norm's "delete" capabilities, thus the need to instantiate the TableModel]##
    withDbTransaction(connection):
        {.cast(gcsafe).}:
            connection.deleteEntryInTransaction(entryId, modelType)


#UPDATE PROCS
proc updateEntryInTransaction*[T: Model](connection: MyDbConn, entry: var T): T =
    ##[ Core proc to insert an entry of Model `T` into its associated table.
    Triggers preCreateSignal and postCreateSignal if there are any defined for the model ]##
    triggerSignal(SignalType.stPreUpdate, connection, entry)
    
    connection.update(entry)
    
    triggerSignal(SignalType.stPostUpdate, connection, entry)
    
    result = entry


proc updateEntry*[T: Model](entry: var T): T =
    ##[ Replaces an entry of a given TableModel T with the data provided as a JSON string
    and returns a different representation of that entry via model M.

    If `entryJsonData` does not contain the id of the entry that shall be updated, 
    then the given entryId is used. Otherwise the id in the given entryJsonData is used.
    
    WARNING: ``T`` and ``M`` **must** be models for the same database table!]##

    withDbTransaction(connection):
        {.cast(gcsafe).}:
            result = connection.updateEntryInTransaction(entry)


proc updateEntry*[T: Model](entryId: int64, entryJsonData: string, modelType: typedesc[T]): T =
    var entry: T = entryJsonData.fromJson(T)
    if entry.id == 0:
        entry.id = entryId

    result = updateEntry(entry)

proc updateArticleEntry*[T: Model](entryId: int64, entryJsonData: string, modelType: typedesc[T]): T =
    var entry: T = entryJsonData.fromJson(T)
    entry.update_datetime = djangoDateTimeType.now()

    if entry.id == 0:
        entry.id = entryId

    result = updateEntry(entry)

#CREATE PROCS
proc createEntryInTransaction*[T: Model](connection: MyDbConn, entry: var T): T =
    ##[ Core proc to insert an entry of Model `T` into its associated table.
    Triggers preCreateSignal and postCreateSignal if there are any defined for the model ]##
    triggerSignal(SignalType.stPreCreate, connection, entry)
    
    connection.insert(entry)

    triggerSignal(SignalType.stPostCreate, connection, entry)

    result = entry


proc createEntry*[T: Model](entry: var T): T =
    ##[ Core proc to insert an entry of Model `T` into its associated table.
    Triggers preCreateSignal and postCreateSignal if there are any defined for the model ]##
    
    withDbTransaction(connection):
        {.cast(gcsafe).}:
            result = connection.createEntryInTransaction(entry)


proc createEntry*[T: Model](entryJsonData: string, modelType: typedesc[T]): T =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and want to provide your own connection ]##

    var entry: T = entryJsonData.fromJson(T)
    result = createEntry(entry)



proc createArticleEntry*[T: Model](entryJsonData: string, modelType: typedesc[T]): T =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and the model is an Article, which means creation and updateTime need to 
    be set accordingly. You can provide your own connection here]##
    var entry: T = entryJsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    result = createEntry(entry)
