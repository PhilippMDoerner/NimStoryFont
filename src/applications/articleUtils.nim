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


#TODO: Refactor this into custom procs that only contain search specific data
proc getArticleData*(articleTable: ArticleTable, articleId: int64): JsonNode =
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
