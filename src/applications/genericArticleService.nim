import genericArticleRepository
import norm/[model]
import jsony
import ../utils/djangoDateTime/[djangoDateTimeType, serialization]
import ../applicationConstants
import ../utils/databaseUtils

type SerializationByIdProc*[T: object | ref object] = proc(connection: sqlite.DbConn, entryId: int64): T {.gcsafe.}
type SerializationByNameProc*[T: object | ref object] = proc(campaignName: string, entryName: string): T {.gcsafe.}

proc updateArticle*[T: Model, M: object | ref object](entryId: int64, jsonData: string, modelType: typedesc[T], getSerializedArticleData: SerializationByIdProc[M]): M =
  var entry: T = jsonData.fromJson(T)
  entry.update_datetime = djangoDateTimeType.now()

  if entry.id == MODEL_INIT_ID:
    entry.id = entryId

  assert(entry.id == entryId, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  withDbTransaction(connection):
    let updatedEntry = connection.updateEntryInTransaction(entry)
    result = connection.getSerializedArticleData(updatedEntry.id)

proc createArticle*[T: Model, M: object | ref object](jsonData: string, modelType: typedesc[T], getSerializedArticleData: SerializationByIdProc[M]): M =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and the model is an Article, which means creation and updateTime need to 
    be set accordingly. You can provide your own connection here]##
    var entry: T = jsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    withDbTransaction(connection):
      let createdEntry = connection.createEntryInTransaction(entry)
      result = connection.getSerializedArticleData(createdEntry.id)

proc deleteArticle*[T: Model](entryId: int64, modelType: typedesc[T]) =
  deleteEntry(entryId, modelType)