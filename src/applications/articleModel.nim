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

type Article* = Character | Creature | DiaryEntry | Encounter | Item | Location | Map | MarkerMap | Organization | Quest | SessionAudio | Spell | Rule
