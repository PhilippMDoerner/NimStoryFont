import norm/[sqlite, model]
import std/[strutils, json, sequtils]
import ./searchModel
import ./searchUtils
import ./searchRepository
import ./articleToStringUtils
import ../articleModel
import ../articleUtils

proc getArticleTable[T: Article](model: typedesc[T]): ArticleTable {.compileTime.} =
  const articleTable: string = T.table()[1..^2] # Removes parenthesis
  result = parseEnum[ArticleTable](articleTable)

proc deleteSearchEntry*(connection: DbConn, article: Article) =
  deleteSearchEntry(connection, article.getSearchGuid())

proc updateSearchEntryContent*(connection: DbConn, article: Article) =
  let searchTitle: string = connection.getSearchTitle(article)
  let searchBody: string = connection.getSearchBody(article)
  let guid = article.getSearchGuid()
  const table: ArticleTable = getArticleTable(article.type)
  let record: JsonNode = connection.getArticleData(table, article.id)
  updateSearchEntryContent(connection, guid, searchTitle, searchBody, $record)


proc addSearchEntry*(connection: DbConn, article: Article) =
  let searchTitle: string = connection.getSearchTitle(article)
  let searchBody: string = connection.getSearchBody(article)
  const table: ArticleTable = getArticleTable(article.type)
  let record: JsonNode = connection.getArticleData(table, article.id)
  addSearchEntry(connection, searchTitle, searchBody, $table, article.id, $record, article.campaign_id)


proc findArticles*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchSerializable] =
  let searchHits: seq[SearchHit] = search(campaignName, searchText, searchLimit)
  result = searchHits.mapIt(it.record.parseJson())
