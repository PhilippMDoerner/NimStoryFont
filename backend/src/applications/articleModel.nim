import character/characterModel
import creature/creatureModel
import diaryentry/diaryEntryModel
import encounter/encounterModel
import item/itemModel
import location/locationModel
import map/mapModel
import organization/organizationModel
import quest/questModel
import sessionaudio/sessionaudioModel
import spell/spellModel
import rules/ruleModel
import mapMarker/markerModel
import ../applicationSettings
import ../utils/myStrutils

type ArticleTable* = enum
  atbCHARACTER = CHARACTER_TABLE
  atbCREATURE = CREATURE_TABLE
  atbDIARYENTRY = DIARYENTRY_TABLE
  atbENCOUNTER = ENCOUNTER_TABLE
  atbITEM = ITEM_TABLE
  atbLOCATION = LOCATION_TABLE
  atbMAP = MAP_TABLE
  atbORGANIZATION = ORGANIZATION_TABLE
  atbQUEST = QUEST_TABLE
  atbSESSIONAUDIO = SESSIONAUDIO_TABLE
  atbSPELL = SPELL_TABLE
  atbRULE = RULES_TABLE

type Article* =
  Character | Creature | DiaryEntry | Encounter | Item | Location | Map | MarkerMap |
  Organization | OrganizationRead | Quest | SessionAudio | Spell | Rule

type ArticleType* = enum
  atCharacter = Character.toLower()
  atCreature = Creature.toLower()
  atDiaryEntry = DiaryEntry.toLower()
  atEncounter = Encounter.toLower()
  atItem = Item.toLower()
  atLocation = Location.toLower()
  atMap = Map.toLower()
  atOrganization = Organization.toLower()
  atQuest = Quest.toLower()
  atSessionAudio = SessionAudio.toLower()
  atSpell = Spell.toLower()
  atRule = "rules"
