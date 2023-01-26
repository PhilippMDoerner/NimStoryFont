import norm/[sqlite, model]
import std/[strutils, json, sequtils]
import ./searchModel
import ./searchUtils
import ./searchRepository
import ./articleToStringUtils
import ../articleModel
import ../articleUtils

proc deleteSearchEntry*(connection: DbConn, article: Article) =
  deleteSearchEntry(connection, article.getSearchGuid())


proc updateSearchEntryContent*(connection: DbConn, article: Article) =
  let searchTitle: string = connection.getSearchTitle(article)
  let searchBody: string = connection.getSearchBody(article)
  let guid = article.getSearchGuid()
  let articleJson = article.toJson()
  updateSearchEntryContent(connection, guid, searchTitle, searchBody, articleJson)


proc addSearchEntry*(connection: DbConn, article: Article) =
  let searchTitle: string = connection.getSearchTitle(article)
  let searchBody: string = connection.getSearchBody(article)
  var articleTable: string = article.type().table()
  articleTable.removeSuffix('"')
  articleTable.removePrefix('"')
  let articleTableEnum = parseEnum[ArticleTable](articleTable)
  let record: JsonNode = connection.getArticleData(articleTableEnum, article.id)
  addSearchEntry(connection, searchTitle, searchBody, articleTable, article.id, $record, article.campaign_id)


proc findArticles*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchSerializable] =
  let searchHits: seq[SearchHit] = search(campaignName, searchText, searchLimit)
  result = searchHits.mapIt(it.record.parseJson())
