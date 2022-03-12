import ../articleUtils
import ../articleModel
import contentUpdateModel
import contentUpdateRepository
import tinypool
import std/[json, strutils]

proc getRecentlyUpdatedArticles*(campaignName: string, pageNumber: int, pageSize: int): seq[ContentUpdateSerializable] =
  let recentlyUpdatedArticlesHits: seq[UpdatedArticle] = getRecentlyUpdatedArticleViewEntries(campaignName, pageNumber, pageSize)

  withDbConn(connection):
    for articleHit in recentlyUpdatedArticlesHits:
      let articleTable: ArticleTable = parseEnum[ArticleTable](articleHit.table_name)
      let articleDataJsonString: JsonNode = getArticleData(articleTable, articleHit.record_id)

      result.add(ContentUpdateSerializable(hit: articleHit, articleDataJson: articleDataJsonString))
