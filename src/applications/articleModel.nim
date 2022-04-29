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

type ArticleTable* = enum #TODO: Replace this with applicationSettings constants once that can compile
  atbCHARACTER = "wikientries_character"
  atbCREATURE = "wikientries_creature"
  atbDIARYENTRY = "wikientries_diaryentry"
  atbENCOUNTER = "wikientries_encounter"
  atbITEM = "wikientries_item"
  atbLOCATION = "wikientries_location"
  atbMAP = "map_map"
  atbORGANIZATION = "wikientries_organization"
  atbQUEST = "wikientries_quest"
  atbSESSIONAUDIO = "fileserver_sessionaudio"
  atbSPELL = "wikientries_spell"
  atbRULE = "wikientries_rules"

type Article* = Character | Creature | DiaryEntry | Encounter | Item | Location | Map | MarkerMap | Organization | Quest | SessionAudio | Spell | Rule
type ArticleType* = enum
  atCharacter = "character"
  atCreature = "creature"
  atDiaryEntry = "diaryentry"
  atEncounter = "encounter"
  atItem = "item"
  atLocation = "location"
  atMap = "map"
  atOrganization = "organization"
  atQuest = "quest"
  atSessionAudio = "sessionaudio"
  atSpell = "spell"
  atRule = "rule"
