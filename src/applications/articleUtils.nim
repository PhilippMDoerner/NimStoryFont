import std/json
import jsony
import ./articleModel
import ./character/[characterSerialization, characterService]
import ./creature/[creatureSerialization, creatureService]
import ./diaryentry/[diaryEntrySerialization, diaryEntryService]
import ./encounter/[encounterSerialization, encounterService]
import ./item/[itemSerialization, itemService]
import ./location/[locationSerialization, locationService]
import ./map/[mapSerialization, mapService]
import ./organization/[organizationSerialization, organizationService]
import ./quest/[questSerialization, questService]
import ./sessionaudio/[sessionAudioSerialization, sessionaudioService]
import ./spell/[spellSerialization, spellService]
import ./rules/[ruleSerialization, ruleService]
import ./genericArticleRepository
import ../database
import ../utils/djangoDateTime/[serialization]


#TODO: Refactor this into custom procs that only contain search specific data
proc getArticleData*(connection: DbConn, articleTable: ArticleTable, articleId: int64): JsonNode =
  var jsonString: string

  case articleTable:
    of ArticleTable.atbCHARACTER:
      let entry = connection.getEntryById(articleId, characterService.CharacterOverview)
      jsonString = connection.overviewSerialize(entry).toJson()
    of ArticleTable.atbCREATURE:
      let entry = connection.getEntryById(articleId, creatureService.CreatureOverview)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbDIARYENTRY:
      let entry = connection.getEntryById(articleId, diaryentryService.DiaryEntryRead)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbENCOUNTER:
      let entry = connection.getEntryById(articleId, encounterService.EncounterRead)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbITEM:
      let entry = connection.getEntryById(articleId, itemService.ItemRead)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbLOCATION:
      let entry = connection.getEntryById(articleId, locationService.LocationRead)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbMAP:
      let entry = connection.getEntryById(articleId, mapService.MapRead)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbORGANIZATION:
      let entry = connection.getEntryById(articleId, organizationService.OrganizationOverview)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbQUEST:
      let entry = connection.getEntryById(articleId, questService.QuestRead)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbSESSIONAUDIO:
      let entry = connection.getEntryById(articleId, sessionaudioService.SessionAudioRead)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbSPELL:
      let entry = connection.getEntryById(articleId, spellService.SpellRead)
      jsonString = connection.overviewSerialize(entry).toJson()

    of ArticleTable.atbRULE:
      let entry = connection.getEntryById(articleId, ruleService.RuleRead)
      jsonString = connection.overviewSerialize(entry).toJson()

  result = parseJson(jsonString)

proc getArticleData*(articleTable: ArticleTable, articleId: int64): JsonNode =
  withDbConn(connection):
    result = connection.getArticleData(articleTable, articleId)