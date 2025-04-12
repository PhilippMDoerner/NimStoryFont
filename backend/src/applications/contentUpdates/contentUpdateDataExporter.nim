import std/[strformat, json, sequtils, options]
import norm/[sqlite]
import ./contentUpdateService
import ./contentUpdateSerialization
import ../campaign/[campaignModel]
import ../genericArticleRepository
import ../../utils/djangoDateTime/[djangoDateTimeType]
  
proc exportRecentUpdatesData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let articles = con.getAllRecentlyUpdatedArticles(campaign.name)
  let serializedArticles = articles.mapIt(contentUpdateSerialize(it, some(djangoDateTimeType.now())))
  let pageSize = 24
  let firstPageUrl = fmt"/recentupdates/{campaign.name}"
  let firstPageData = serializedArticles[0 ..< pageSize]
  result[firstPageUrl] = %*firstPageData
  
  let pageCount = serializedArticles.len.div(pageSize)
  for pageIndex in 0..pageCount:
    let pageStartIndex = pageSize * pageIndex
    
    let isLastPage = pageIndex == pageCount      
    let pageEndIndex = if isLastPage:
        let maxIndex = serializedArticles.len
        min((pageStartIndex + pageSize), maxIndex)
      else:
        pageStartIndex + pageSize
    
    let page = serializedArticles[pageStartIndex ..< pageEndIndex]
    let indexedPageUrl = fmt"{firstPageUrl}/{pageIndex}"
    result[indexedPageUrl] = %*page
    
  let lastEmptyPageUrl = fmt"{firstPageUrl}/{pageCount + 1}"
  result[lastEmptyPageUrl] = %*[]