import genericArticleRepository
import norm/[model, sqlite]
import jsony
import ../utils/djangoDateTime/[djangoDateTimeType]
import ../applicationConstants
import ../utils/databaseUtils

type SerializationByIdProc*[M: object | ref object] = proc(entryId: int64): M {.gcsafe.}
type SerializationProc*[T: Model, M: object | ref object] = proc(connection: DbConn, entry: T): M {.gcsafe.}
type OverviewSerializationProc*[M: object | ref object] = proc(campaignName: string): seq[M] {.gcsafe.}

proc updateArticle*[T: Model, M: object | ref object](entryId: int64, jsonData: string, modelType: typedesc[T], getSerializedArticleData: SerializationProc[T, M]): M =
  var entry: T = jsonData.fromJson(T)
  entry.update_datetime = djangoDateTimeType.now()

  if entry.id == MODEL_INIT_ID:
    entry.id = entryId

  assert(entry.id == entryId, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  withDbTransaction(connection):
    let updatedEntry = connection.updateEntryInTransaction(entry)
    result = connection.getSerializedArticleData(updatedEntry)

proc createArticle*[T: Model, M: object | ref object](jsonData: string, modelType: typedesc[T], getSerializedData: SerializationProc[T, M]): M =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and the model is an Article, which means creation and updateTime need to 
    be set accordingly. You can provide your own connection here]##
    var entry: T = jsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    withDbTransaction(connection):
      let createdEntry = connection.createEntryInTransaction(entry)
      result = connection.getSerializedData(createdEntry)

proc deleteArticle*[T: Model](entryId: int64, modelType: typedesc[T]) =
  deleteEntry(entryId, modelType)

proc readArticle*[M: object | ref object](entryId: int64, getSerializedData: SerializationByIdProc[M]): M =
  result = getSerializedData(entryId)

proc readArticleOverviews*[M: object | ref object](campaignName: string, getSerializedData: OverviewSerializationProc[M]): seq[M] =
  result = getSerializedData(campaignName)




proc updateArticle*[T: Model](connection: DbConn, entryId: int64, jsonData: string, modelType: typedesc[T]): T =
  var entry: T = jsonData.fromJson(T)
  entry.update_datetime = djangoDateTimeType.now()

  if entry.id == MODEL_INIT_ID:
    entry.id = entryId

  assert(entry.id == entryId, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  result = connection.updateEntryInTransaction(entry)


proc createArticle*[T: Model](connection: DbConn, jsonData: string, modelType: typedesc[T]): T =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and the model is an Article, which means creation and updateTime need to 
    be set accordingly. You can provide your own connection here]##
    var entry: T = jsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    result = connection.createEntryInTransaction(entry)


### LAST PARADIGM SHIFT, ONCE THIS IS USED EVERYWHERE YOU CAN REMOVE THE OTHER X-ARTICLE PROCS
proc readArticleById*[P: object, E: Model](connection: DbConn, params: P): E =
  ## A default implementation of fetching an article from the DB using the article's id
  result = connection.getEntryById(params.id, E)

proc readArticleByName*[P: object, E: Model](connection: DbConn, params: P): E =
  ## A default implementation of fetching an article from the DB using the article's name and the name of its campaign
  result = connection.getEntryByName(params.campaignName, params.articleName, E)

proc readCampaignArticleList*[P: object, E: Model](connection: DbConn, params: P): seq[E] =
  ## A default implementation of fetching a list of articles from the DB, the list being all articles of that type for a given campaign
  result = connection.getCampaignList(params.campaignName, E)

proc deleteArticle*[E: Model](connection: DbConn, entry: var E) =
  ## A default implementation of deleting a given article from the DB
  connection.deleteEntryInTransaction(entry)

proc updateArticle*[P: object, E: Model](connection: DbConn, params: P, entry: var E): E =
  ## A default implementation of updating the given article in the DB
  entry.update_datetime = djangoDateTimeType.now()
  result = connection.updateEntryInTransaction(entry)

proc createArticle*[P: object, E: Model](connection: DbConn, params: P, entry: var E): E =
  ## A default implementation of creating the given article in the DB
  let creationTime: DjangoDateTime = djangoDateTimeType.now();
  entry.creation_datetime = creationTime
  entry.update_datetime = creationTime
  result = connection.createEntryInTransaction(entry)