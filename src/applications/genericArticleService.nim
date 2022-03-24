import genericArticleRepository
import norm/[model]
import jsony
import ../utils/djangoDateTime/[djangoDateTimeType]
import ../applicationConstants


proc updateArticle*[T: Model](entryId: int64, jsonData: string, modelType: typedesc[T]): T =
  var entry: T = jsonData.fromJson(T)
  entry.update_datetime = djangoDateTimeType.now()

  if entry.id == MODEL_INIT_ID:
    entry.id = entryId

  assert(entry.id == entryId, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  result = updateEntry(entry)

proc createArticle*[T: Model](jsonData: string, modelType: typedesc[T]): T =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and the model is an Article, which means creation and updateTime need to 
    be set accordingly. You can provide your own connection here]##
    var entry: T = jsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    result = createEntry(entry)

proc deleteArticle*[T: Model](entryId: int64, modelType: typedesc[T]): T =
  deleteEntry(entryId, modelType)