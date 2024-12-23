import contentUpdateModel
import contentUpdateRepository
import ../articleUtils
import ../articleModel
import ../../database
import std/[json, strutils]

proc getRecentlyUpdatedArticles*(campaignName: string, pageNumber: int, pageSize: int): seq[JsonNode] =
  let recentlyUpdatedArticlesHits: seq[UpdatedArticle] = getRecentlyUpdatedArticleViewEntries(campaignName, pageNumber, pageSize)

  withDbConn(connection):
    for articleHit in recentlyUpdatedArticlesHits:
      let articleTable: ArticleTable = parseEnum[ArticleTable](articleHit.table_name)
      let articleData: JsonNode = getArticleData(articleTable, articleHit.record_id)

      result.add(articleData)