import articleModel
import jsony
import character/characterService
import creature/creatureService
import diaryentry/diaryEntryService
import encounter/encounterService
import item/itemService
import location/locationService
import map/mapService
import organization/organizationService
import quest/questService
import sessionaudio/sessionaudioService
import spell/spellService
import rules/ruleService
import std/json
import ../utils/djangoDateTime/[serialization]
import genericArticleRepository


#TODO: Refactor this into custom procs that only contain search specific data
proc getArticleData*(articleTable: ArticleTable, articleId: int64): JsonNode =
  var jsonString: string

  case articleTable:
    of ArticleTable.CHARACTER:
      jsonString = getEntryById(articleId, characterService.Character).toJson()
    of ArticleTable.CREATURE:
      jsonString = getEntryById(articleId, creatureService.Creature).toJson()
    of ArticleTable.DIARYENTRY:
      jsonString = getEntryById(articleId, diaryentryService.DiaryEntry).toJson()
    of ArticleTable.ENCOUNTER:
      jsonString = getEntryById(articleId, encounterService.Encounter).toJson()
    of ArticleTable.ITEM:
      jsonString = getEntryById(articleId, itemService.Item).toJson()
    of ArticleTable.LOCATION:
      jsonString = getEntryById(articleId, locationService.Location).toJson()
    of ArticleTable.MAP:
      jsonString = getEntryById(articleId, mapService.Map).toJson()
    of ArticleTable.ORGANIZATION:
      jsonString = getEntryById(articleId, organizationService.Organization).toJson()
    of ArticleTable.QUEST:
      jsonString = getEntryById(articleId, questService.Quest).toJson()
    of ArticleTable.SESSIONAUDIO:
      jsonString = getEntryById(articleId, sessionaudioService.SessionAudio).toJson()
    of ArticleTable.SPELL:
      jsonString = getEntryById(articleId, spellService.Spell).toJson()
    of ArticleTable.RULE:
      jsonString = getEntryById(articleId, ruleService.Rule).toJson()

  result = parseJson(jsonString)
