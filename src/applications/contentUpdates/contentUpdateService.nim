import std/[json, strutils]
import norm/[sqlite]
import contentUpdateModel
import contentUpdateRepository
import ../articleUtils
import ../articleModel
import ../../database

proc getRecentlyUpdatedArticles*(campaignName: string, pageNumber: int, pageSize: int): seq[JsonNode] =
  let recentlyUpdatedArticlesHits: seq[UpdatedArticle] = getRecentlyUpdatedArticleViewEntries(campaignName, pageNumber, pageSize)

  withDbConn(connection):
    for articleHit in recentlyUpdatedArticlesHits:
      let articleTable: ArticleTable = parseEnum[ArticleTable](articleHit.table_name)
      let articleData: JsonNode = getArticleData(articleTable, articleHit.record_id)

      result.add(articleData)

proc getAllRecentlyUpdatedArticles*(con: DbConn, campaignName: string): seq[JsonNode] =
  let recentlyUpdatedArticlesHits: seq[UpdatedArticle] = con.getAllRecentlyUpdatedArticleViewEntries(campaignName)

  for articleHit in recentlyUpdatedArticlesHits:
    let articleTable: ArticleTable = parseEnum[ArticleTable](articleHit.table_name)
    let articleData: JsonNode = con.getArticleData(articleTable, articleHit.record_id)

    result.add(articleData)