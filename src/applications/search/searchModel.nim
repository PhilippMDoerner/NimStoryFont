import ../campaign/campaignModel
import ../../applicationConstants
import constructor/defaults
import std/[json]
import ../character/characterModel
import ../creature/creatureModel
import ../diaryentry/diaryEntryModel
import ../encounter/encounterModel
import ../item/itemModel
import ../location/locationModel
import ../map/mapModel
import ../organization/organizationModel
import ../quest/questModel
import ../sessionaudio/sessionaudioModel
import ../spell/spellModel
import ../rules/ruleModel

export campaignModel

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

type Article* = Character | Creature | DiaryEntry | Encounter | Item | Location | Map | Organization | Quest | SessionAudio | Spell | Rule


type Search* {.defaults.} = object
  title*: string = ""
  title_rev*: string = ""
  body*: string = ""
  body_rev*: string = ""
  table_name*: string = ""
  record_id*: int64 = MODEL_INIT_ID
  campaign_id*: int64 = MODEL_INIT_ID
  guid*: string = ""
implDefaults(Search)

proc newModel*(T: typedesc[Search]): Search = initSearch()
proc newTableModel*(T: typedesc[Search]): Search = initSearch()


type SearchHit* {.defaults.} = object
  title*: string = ""
  table_name*: string = ""
  campaign_id*: int64 = MODEL_INIT_ID
  record_id*: int64 = MODEL_INIT_ID
implDefaults(SearchHit)

proc newViewModel*(T: typedesc[SearchHit]): SearchHit = initSearchHit()

type SearchSerializable* {.defaults.} = object
  hit*: SearchHit
  articleDataJson*: JsonNode
