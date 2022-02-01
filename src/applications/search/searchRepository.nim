import searchModel
import std/[db_sqlite, strutils, json, strformat]
import ../campaign/campaignRepository
import ../character/characterRepository
import ../creature/creatureRepository
import ../diaryentry/diaryEntryRepository
import ../encounter/encounterRepository
import ../item/itemRepository
import ../location/locationRepository
import ../map/mapRepository
import ../organization/organizationRepository
import ../quest/questRepository
import ../sessionaudio/sessionaudioRepository
import ../spell/spellRepository
import ../rules/ruleRepository
import jsony
#import ../../applicationSettings
import ../../utils/nisane/nisane
import ../../utils/djangoDateTime/[serialization]
import ../../utils/myStrutils
import tinypool

export searchRepository

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

type Article = Character | Creature | DiaryEntry | Encounter | Item | Location | Map | Organization | Quest | SessionAudio | Spell | Rule

proc search*(campaignName: string, searchText: string, searchLimit: int = 100): seq[SearchHit] =
  let campaign: Campaign = getCampaignByName(campaignName)
  let campaignId: string = $campaign.id
  let searchSQLStatement: SqlQuery = sql fmt """
      SELECT 
          title,
          table_name,
          campaign_id,
          record_id,
          bm25(search_article_content, 15) as search_score -- 15 states that a match in the title is 15 times as valuable as a match in the body
      FROM search_article_content 
      WHERE
          campaign_id = {campaignId}
          AND (
              title MATCH ?
              OR title_rev MATCH ?
              OR body MATCH ?
              OR body_rev MATCH ?
          )
      ORDER BY search_score
      LIMIT ?;
  """

  var rows: seq[Row]
  withDbConn(connection):
    rows = connection.getAllRows(
      searchSQLStatement,
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
      #jsonString = * getSessionAudioByid(articleId).toJson()
      jsonString = "[]"
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


proc addSearchEntry(article: Article) =
  let searchTitle: string = article.getSearchTitle()
  let searchBody: string = article.getSearchBody()
  addSearchEntry(searchTitle, searchBody, article.table(), article.id, article.campaign_id)


proc addSearchEntry*(searchTitle: string, searchBody: string, tableName: string, record_id: int64, campaign_id: int64) =
  let addSearchEntryQuery = sql"""
    INSERT INTO search_article_content (
      title,
      title_rev, 
      body, 
      body_rev, 
      table_name, 
      record_id, 
      campaign_id, 
      guid
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  """

  withDbConn(connection):
    connection.exec(
      addSearchEntryQuery,
      searchTitle,
      searchTitle.reverseString(),
      searchBody,
      searchBody.reverseString(),
      tableName,
      $recordId,
      $campaignId,
      fmt "{tableName}_{record_id}"
    )