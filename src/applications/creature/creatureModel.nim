import norm/[model, pragmas]
import std/[options]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType


type Creature* {.tableName: CREATURE_TABLE.} = ref object of Model
    ##[TableModel of the table of creatures ]##
    name*: string
    description*: Option[string] # A description of the character
    creation_datetime*: DjangoDateTime
    update_datetime*: DjangoDateTime
    campaign_id*: int # The id of the campaign that this character occurred in

type CreatureRead* {.tableName: CREATURE_TABLE.} = ref object of Model
    ##[An extended Model of a creatures. Instead of the foreign-key ids it contains
    direct (reduced) representations of the datasets that the foreign-keys link to. ]##
    name*: string
    description*: Option[string] # A description of the character
    creation_datetime*: DjangoDateTime
    update_datetime*: DjangoDateTime
    campaign_id*: MinimumCampaignOverview


type CreatureOverview* {.tableName: CREATURE_TABLE.} = ref object of Model
    ##[A reduced Model of a story-character. Cut down to the bare minimum needed to
    make a list of characters with necessary meta data ]##
    name*: string
    update_datetime*: DjangoDateTime
    campaign_id*: MinimumCampaignOverview


proc newCreatureRead*(
    name: string = "",
    description: Option[string] = none(string),
    creationDatetime: DjangoDateTime = djangoDateTimeType.now(),
    updateDatetime: DjangoDateTime = djangoDateTimeType.now(),
    campaign: MinimumCampaignOverview = newMinimumCampaignOverview()
): CreatureRead =
    ##[For use with norm on GET request]##
    result = CreatureRead(
        name: name,
        description: description,
        creation_datetime: creationDatetime,
        update_datetime: updateDatetime,
        campaign_id: campaign
    )


proc newCreature(
    name: string = "",
    description: Option[string] = none(string),
    creationDatetime: DjangoDateTime = djangoDateTimeType.now(),
    updateDatetime: DjangoDateTime = djangoDateTimeType.now(),
    campaign: int = -1
): Creature =
    ##[For use with norm on GET request]##
    result = Creature(
        name: name,
        description: description,
        creation_datetime: creationDatetime,
        update_datetime: updateDatetime,
        campaign_id: campaign
    )


proc newCreatureOverview(
    name: string = "",
    updateDatetime: DjangoDateTime = djangoDateTimeType.now(),
    campaign: MinimumCampaignOverview = newMinimumCampaignOverview()
): CreatureOverview =
    ##[For use with norm on GET request]##
    result = CreatureOverview(
        name: name,
        update_datetime: updateDatetime,
        campaign_id: campaign
    )


proc newModel*(T: typedesc[Creature]): Creature =
    ##[Enables generic instantiation of the model. This enable the use of 
    generic methods that only read the database in genericArticleRepository ]##
    result = newCreature()


proc newTableModel*(T: typedesc[Creature]): Creature =
    ##[Enables generic instantiation of the model as a Table Model.
    This enables the use of generic methods to create, update and delete 
    entries from the database from the genericArticleRepository ]##
    result = newCreature()


proc newModel*(T: typedesc[CreatureOverview]): CreatureOverview =
    ##[Enables generic instantiation of the model. This enable the use of 
    generic methods that only read the database in genericArticleRepository ]##
    result = newCreatureOverview()


proc newModel*(T: typedesc[CreatureRead]): CreatureRead =
    ##[Enables generic instantiation of the model. This enable the use of 
    generic methods that only read the database in genericArticleRepository ]##
    result = newCreatureRead()