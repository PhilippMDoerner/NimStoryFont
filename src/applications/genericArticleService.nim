import genericArticleRepository
import genericDeserialization
import serializationUtils
import norm/[model, sqlite]
import jsony
import ../utils/djangoDateTime/[djangoDateTimeType]
import std/[json, tables]

export serializationUtils

type InvalidDatabaseManipulation* = object of CatchableError

type SerializationByIdProc*[M: object | ref object] = proc(entryId: int64): M {.gcsafe.}
type SerializationProc*[T: Model, M: object | ref object] = proc(connection: DbConn, entry: T): M {.gcsafe.}
type OverviewSerializationProc*[M: object | ref object] = proc(campaignName: string): seq[M] {.gcsafe.}




proc createArticle*[T: Model](connection: DbConn, jsonData: string, modelType: typedesc[T]): T =
    ##[ Helper proc for createEntry when you receive the entry as a jsonString
    and the model is an Article, which means creation and updateTime need to 
    be set accordingly. You can provide your own connection here]##
    var entry: T = jsonData.fromJson(T)

    let creationTime: DjangoDateTime = djangoDateTimeType.now()
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    result = connection.createEntryInTransaction(entry)


proc createArticle*[P: object, E: Model](connection: DbConn, params: P, entry: var E): E =
  ## A default implementation of creating the given article in the DB
  let creationTime: DjangoDateTime = djangoDateTimeType.now()
  entry.creation_datetime = creationTime
  entry.update_datetime = creationTime

  result = connection.createEntryInTransaction(entry)

proc createEntry*[P: object, E: Model](connection: DbConn, params: P, entry: var E): E =
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

proc updateArticle*[P: object, E: Model](connection: DbConn, params: P): E =
  ## A default implementation of updating the given article in the DB
  var entry: E = params.body.fromJson(E)
  entry.update_datetime = djangoDateTimeType.now()
  let newEntry = connection.updateEntryInTransaction(entry)

  result = newEntry

proc updateEntry*[P: object, E: Model](connection: DbConn, params: P): E =
  ## A default implementation of updating the given entry in the DB
  var entry: E = params.body.fromJson(E)
  let newEntry = connection.updateEntryInTransaction(entry)

  result = newEntry

proc patchArticle*[P: object, E: Model](connection: DbConn, params: P, entry: E): E =
  ## A default implementation of patching the given article with inbdividually changed fields and persisting that to the DB
  let jsonData: JsonNode = params.body.parseJson()
  var patchedEntry: E = updateArticleWithJson[E](jsonData, entry)
  
  patchedEntry.update_datetime = djangoDateTimeType.now()
  result = connection.updateEntryInTransaction(patchedEntry)

proc patchEntry*[P: object, E: Model](connection: DbConn, params: P, entry: E): E =
  ## A default implementation of patching the given article with inbdividually changed fields and persisting that to the DB
  let jsonData: JsonNode = params.body.parseJson()
  var patchedEntry: E = updateEntryWithJson[E](jsonData, entry)
  
  result = connection.updateEntryInTransaction(patchedEntry)
