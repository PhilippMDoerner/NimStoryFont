import norm/[sqlite, model]
import std/[strutils, json]
import ./searchModel
import ./searchUtils
import ./searchRepository
import ./articleToStringUtils
import ../articleModel
import ../articleUtils
import ../../database

proc deleteSearchEntry*(connection: DbConn, article: Article) =
  deleteSearchEntry(connection, article.getSearchGuid())


proc updateSearchEntryContent*(connection: DbConn, article: Article) =
  let searchTitle: string = connection.getSearchTitle(article)
  let searchBody: string = connection.getSearchBody(article)
  let guid = article.getSearchGuid()
  updateSearchEntryContent(connection, guid, searchTitle, searchBody)


proc addSearchEntry*(connection: DbConn, article: Article) =
  let searchTitle: string = connection.getSearchTitle(article)
  let searchBody: string = connection.getSearchBody(article)
  var articleTable: string = article.type().table()
  articleTable.removeSuffix('"')
  articleTable.removePrefix('"')
  addSearchEntry(connection, searchTitle, searchBody, articleTable, article.id, article.campaign_id)


proc findArticles*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchSerializable] =
  let searchHits: seq[SearchHit] = search(campaignName, searchText, searchLimit)

  withDbConn(connection):
    for searchHit in searchHits:
      let tableName: string = searchHit.table_name
      let articleTable: ArticleTable = parseEnum[ArticleTable](tableName)      
      let articleDataJsonString: JsonNode = getArticleData(articleTable, searchHit.record_id)

      result.add(articleDataJsonString)
