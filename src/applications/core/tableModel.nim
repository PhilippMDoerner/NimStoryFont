import ../campaign/campaignModel
import ../authentication/authenticationModels
import ../character/characterModel
import ../creature/creatureModel
import ../diaryentry/diaryEntryModel
import ../encounter/encounterModel
import ../item/itemModel
import ../location/locationModel
import ../map/mapModel
import ../organization/organizationModel
import ../quest/questModel
import ../session/sessionModel
import ../sessionaudio/sessionaudioModel
import ../spell/spellModel
import ../rules/ruleModel
import ../image/imageModel
import std/[strutils, typetraits]

#TODO Instead of hard-coding the strings, derive them from the particular models. Will need the parseEnum fix though
type TableModelKind* = enum
  ## An enum representing the TableModels of every possible table in the database. 
  ## The enum's values are the names of the table models that represent them
  tmkCharacter = "character"
  tmkCreature = "creature"
  tmkEncounter = "encounter"
  tmkItem = "item"
  tmkGroup = "group"
  tmkPermission = "permission"
  tmkCampaign = "campaign"
  tmkDiaryEntry = "diaryentry"
  tmkImage = "image"
  tmkQuest = "quest"
  tmkRule = "rule"
  tmkSpell = "spell"
  tmkSession = "session"
  tmkLocation = "location"
  tmkOrganization = "organization"
  tmkMap = "map"


type TableModelVariant* = ref object
  ## An object variant that can represents any object of a TableModel
  case kind*: TableModelKind
  of tmkCharacter: character*: Character
  of tmkCreature: creature*: Creature
  of tmkEncounter: encounter*: Encounter
  of tmkItem: item*: Item
  of tmkGroup: group*: Group
  of tmkPermission: permission*: Permission
  of tmkCampaign: campaign*: Campaign
  of tmkDiaryEntry: diaryEntry*: DiaryEntry
  of tmkImage: image*: Image
  of tmkQuest: quest*: Quest
  of tmkRule: rule*: Rule
  of tmkSpell: spell*: Spell
  of tmkSession: session*: Session
  of tmkLocation: location*: Location
  of tmkOrganization: organization*: Organization
  of tmkMap: map: Map

template newTableModelVariant*(modelInstance: typed): TableModelVariant =
  ## Helper template for instantiating the TableModelVariant from any TableModel object
  ## Must be of a model type whose lowercase name is in the TableModelKind enum
  const modelName: string = name(modelInstance.type).toLower()
  const tableKind: TableModelKind = parseEnum[TableModelKind](modelName)
  echo "The table model kind: " & $tableKind
  
  when tableKind == tmkCharacter:
    TableModelVariant(kind: tableKind, character: modelInstance)
  elif tableKind == tmkCreature:
    TableModelVariant(kind: tableKind, creature: modelInstance)
  elif tableKind == tmkCampaign:
    TableModelVariant(kind: tableKind, campaign: modelInstance)
  elif tableKind == tmkDiaryEntry:
    TableModelVariant(kind: tableKind, diaryEntry: modelInstance)
  elif tableKind == tmkEncounter:
    TableModelVariant(kind: tableKind, encounter: modelInstance)
  elif tableKind == tmkGroup:
    TableModelVariant(kind: tableKind, group: modelInstance)
  elif tableKind == tmkImage:
    TableModelVariant(kind: tableKind, image: modelInstance)
  elif tableKind == tmkItem:
    TableModelVariant(kind: tableKind, item: modelInstance)
  elif tableKind == tmkLocation:
    TableModelVariant(kind: tableKind, location: modelInstance)
  elif tableKind == tmkMap:
    TableModelVariant(kind: tableKind, map: modelInstance)
  elif tableKind == tmkOrganization:
    TableModelVariant(kind: tableKind, organization: modelInstance)
  elif tableKind == tmkPermission:
    TableModelVariant(kind: tableKind, permission: modelInstance)
  elif tableKind == tmkQuest:
    TableModelVariant(kind: tableKind, quest: modelInstance)
  elif tableKind == tmkRule:
    TableModelVariant(kind: tableKind, rule: modelInstance)
  elif tableKind == tmkSession:
    TableModelVariant(kind: tableKind, session: modelInstance)
  elif tableKind == tmkSpell:
    TableModelVariant(kind: tableKind, spell: modelInstance)
