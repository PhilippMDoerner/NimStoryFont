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
    of ArticleTable.atbCHARACTER:
      jsonString = getEntryById(articleId, characterService.Character).toJson()
    of ArticleTable.atbCREATURE:
      jsonString = getEntryById(articleId, creatureService.Creature).toJson()
    of ArticleTable.atbDIARYENTRY:
      jsonString = getEntryById(articleId, diaryentryService.DiaryEntry).toJson()
    of ArticleTable.atbENCOUNTER:
      jsonString = getEntryById(articleId, encounterService.Encounter).toJson()
    of ArticleTable.atbITEM:
      jsonString = getEntryById(articleId, itemService.Item).toJson()
    of ArticleTable.atbLOCATION:
      jsonString = getEntryById(articleId, locationService.Location).toJson()
    of ArticleTable.atbMAP:
      jsonString = getEntryById(articleId, mapService.Map).toJson()
    of ArticleTable.atbORGANIZATION:
      jsonString = getEntryById(articleId, organizationService.Organization).toJson()
    of ArticleTable.atbQUEST:
      jsonString = getEntryById(articleId, questService.Quest).toJson()
    of ArticleTable.atbSESSIONAUDIO:
      jsonString = getEntryById(articleId, sessionaudioService.SessionAudio).toJson()
    of ArticleTable.atbSPELL:
      jsonString = getEntryById(articleId, spellService.Spell).toJson()
    of ArticleTable.atbRULE:
      jsonString = getEntryById(articleId, ruleService.Rule).toJson()

  result = parseJson(jsonString)
