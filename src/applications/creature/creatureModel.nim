import norm/[model, pragmas]
import std/[options]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults


type Creature* {.defaults, tableName: CREATURE_TABLE.} = ref object of Model
    ##[TableModel of the table of creatures ]##
    name*: string = ""
    description*: Option[string] = none(string) # A description of the character
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

implDefaults(Creature)
proc newModel*(T: typedesc[Creature]): Creature = newCreature()
proc newTableModel*(T: typedesc[Creature]): Creature = newCreature()



type CreatureRead* {.defaults, tableName: CREATURE_TABLE.} = ref object of Model
    ##[An extended Model of a creatures. Instead of the foreign-key ids it contains
    direct (reduced) representations of the datasets that the foreign-keys link to. ]##
    name*: string = ""
    description*: Option[string] = none(string) # A description of the character
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)

implDefaults(CreatureRead)
proc newModel*(T: typedesc[CreatureRead]): CreatureRead = newCreatureRead()



type CreatureOverview* {.defaults, tableName: CREATURE_TABLE.} = ref object of Model
    ##[A reduced Model of a story-character. Cut down to the bare minimum needed to
    make a list of characters with necessary meta data ]##
    name*: string = ""
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)

implDefaults(CreatureOverview)
proc newModel*(T: typedesc[CreatureOverview]): CreatureOverview = newCreatureOverview()
