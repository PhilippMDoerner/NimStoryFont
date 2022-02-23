import searchModel
import searchUtils
import searchRepository
import norm/model
import std/[db_sqlite, strutils, json]
import ../character/characterService
import ../creature/creatureService
import ../diaryentry/diaryEntryService
import ../encounter/encounterService
import ../item/itemService
import ../location/locationService
import ../map/mapService
import ../organization/organizationService
import ../quest/questService
import ../sessionaudio/sessionaudioService
import ../spell/spellService
import ../rules/ruleService
import jsony
#import ../../applicationSettings
import ../../utils/djangoDateTime/[serialization]
import tinypool
import articleToStringUtils


proc deleteSearchEntry*(connection: DbConn, article: Article) =
  deleteSearchEntry(connection, article.getSearchGuid())


proc updateSearchEntryContent*(connection: DbConn, article: Article) =
  let searchTitle: string = article.getSearchTitle()
  let searchBody: string = article.getSearchBody()
  let guid = article.getSearchGuid()
  updateSearchEntryContent(connection, guid, searchTitle, searchBody)


proc addSearchEntry*(connection: DbConn, article: Article) =
  let searchTitle: string = article.getSearchTitle()
  let searchBody: string = article.getSearchBody()
  addSearchEntry(connection, searchTitle, searchBody, article.type.table(), article.id, article.campaign_id)


#TODO: Refactor this into custom procs that only contain search specific data
proc getArticleData(articleTable: ArticleTable, articleId: int64): JsonNode =
  var jsonString: string

  case articleTable:
    of ArticleTable.CHARACTER:
      jsonString = getCharacterById(articleId).toJson()
    of ArticleTable.CREATURE:
      jsonString = getCreatureById(articleId).toJson()
    of ArticleTable.DIARYENTRY:
      jsonString = getDiaryentryById(articleId).toJson()
    of ArticleTable.ENCOUNTER:
      jsonString = getEncounterById(articleId).toJson()
    of ArticleTable.ITEM:
      jsonString = getItemById(articleId).toJson()
    of ArticleTable.LOCATION:
      jsonString = getLocationById(articleId).toJson()
    of ArticleTable.MAP:
      jsonString = getMapById(articleId).toJson()
    of ArticleTable.ORGANIZATION:
      jsonString = getOrganizationById(articleId).toJson()
    of ArticleTable.QUEST:
      jsonString = getQuestById(articleId).toJson()
    of ArticleTable.SESSIONAUDIO:
      jsonString = getSessionAudioByid(articleId).toJson()
    of ArticleTable.SPELL:
      jsonString = getSpellById(articleId).toJson()
    of ArticleTable.RULE:
      jsonString = getRuleById(articleId).toJson()

  result = parseJson(jsonString)


proc findArticles*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchSerializable] =
  let searchHits: seq[SearchHit] = search(campaignName, searchText, searchLimit)

  withDbConn(connection):
    for searchHit in searchHits:
      let articleTable: ArticleTable = parseEnum[ArticleTable](searchHit.table_name)      
      let articleDataJsonString: JsonNode = getArticleData(articleTable, searchHit.record_id)

      result.add(SearchSerializable(hit: searchHit, articleDataJson: articleDataJsonString))
