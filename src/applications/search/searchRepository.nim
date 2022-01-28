import searchModel
import std/[db_sqlite, strutils, json]
import ../campaign/campaignRepository
import ../character/characterRepository
import ../creature/creatureRepository
#import ../diaryentry/diaryentryRepository
import ../encounter/encounterRepository
import ../item/itemRepository
#import ../location/locationRepository
#import ../map/mapRepository
import ../organization/organizationRepository
#import ../quest/questRepository
#import ../sessionaudio/sessionaudioRepository
#import ../spell/spellRepository
#import ../rules/rulesRepository
import jsony
#import ../../applicationSettings
import ../../utils/nisane/nisane
import ../../utils/djangoDateTime/[djangoDateTimeType, serialization]
import tinypool

type ArticleTable = enum #TODO: Replace this with applicationSettings constants once that can compile
  CHARACTER = "wikientries_character"
  CREATURE = "wikientries_creature"
  DIARYENTRY = "wikientries_diaryentry"
  ENCOUNTER = "wikientries_encounter"
  ITEM = "wikientries_item"
  LOCATION = "wikientries_location"
  MAP = "map_map"
  ORGANIZATION = "wikientries_organization"
  QUEST = "wikientries_quest"
  SESSIONAUDIO = "fileserver_sessionaudio"
  SPELL = "wikientries_spell"
  RULE = "wikientries_rules"


proc search*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchHit] =
  let campaign: Campaign = getCampaignByName(campaignName)
  let campaignId: string = $campaign.id
  let searchSQLStatement = """
      SELECT 
          title,
          table_name,
          campaign_id,
          record_id,
          bm25(search_article_content, 15) as search_score -- 15 states that a match in the title is 15 times as valuable as a match in the body
      FROM search_article_content 
      WHERE
          campaign_id = """ & campaignId & """
          AND (
              title MATCH ?
              OR title_rev MATCH ?
              OR body MATCH ?
              OR body_rev MATCH ?
          )
      ORDER BY search_score
      LIMIT ?;
  """

  let searchSQLQuery: SqlQuery = sql(searchSQLStatement)

  var rows: seq[Row]
  withDbConn(connection):
    rows = connection.getAllRows(
      searchSQLQuery,
      searchText, 
      searchText, 
      searchText, 
      searchText,
      searchLimit
    )

  var searchEntries: seq[SearchHit] = @[]
  for row in rows:
    var searchEntry: SearchHit = newViewModel(SearchHit)
    row.to(searchEntry, nil)
    searchEntries.add(searchEntry)

  result = searchEntries


proc toJsonHook*(djangoDateTime: DjangoDateTime): JsonNode = %djangoDateTime.format()
proc fromJsonHook*(self: var DjangoDateTime, jsonNode: JsonNode) =
    self = parseDefault(jsonNode.getStr())

#TODO: Refactor this into custom procs that only contain search specific data
proc getArticleData(articleTable: ArticleTable, articleId: int64): JsonNode =
  var jsonString: string

  case articleTable:
    of ArticleTable.CHARACTER:
      jsonString = getCharacterById(articleId).toJson()
    of ArticleTable.CREATURE:
      jsonString = getCreatureById(articleId).toJson()
    of ArticleTable.DIARYENTRY:
      #jsonString = getDiaryentryById(articleId).toJson()
      jsonString = "[]"
    of ArticleTable.ENCOUNTER:
      jsonString = getEncounterById(articleId).toJson()
    of ArticleTable.ITEM:
      jsonString = getItemById(articleId).toJson()
    of ArticleTable.LOCATION:
      #jsonString = getLocationById(articleId).toJson()
      jsonString = "[]"
    of ArticleTable.MAP:
      #jsonString = getMapById(articleId).toJson()
      jsonString = "[]"
    of ArticleTable.ORGANIZATION:
      jsonString = getOrganizationById(articleId).toJson()
    of ArticleTable.QUEST:
      #jsonString = getQuestById(articleId).toJson()
      jsonString = "[]"
    of ArticleTable.SESSIONAUDIO:
      #jsonString = * getSessionAudioByid(articleId).toJson()
      jsonString = "[]"
    of ArticleTable.SPELL:
      #jsonString = getSpellById(articleId).toJson()
      jsonString = "[]"
    of ArticleTable.RULE:
      #jsonString = getRuleById(articleId).toJson()
      jsonString = "[]"

  result = parseJson(jsonString)

proc findArticles*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchSerializable] =
  let searchHits: seq[SearchHit] = search(campaignName, searchText, searchLimit)

  withDbConn(connection):
    for searchHit in searchHits:
      let articleTable: ArticleTable = parseEnum[ArticleTable](searchHit.table_name)      
      let articleDataJsonString: JsonNode = getArticleData(articleTable, searchHit.record_id)

      result.add(SearchSerializable(hit: searchHit, articleDataJson: articleDataJsonString))
