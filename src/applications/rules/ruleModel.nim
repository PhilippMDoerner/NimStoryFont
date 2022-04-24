import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import ../campaign/campaignModel
import std/[options]
import constructor/defaults
import norm/[model, pragmas]

type Rule* {.defaults, tableName: RULES_TABLE.} = ref object of Model
    name*: string = ""
    description*: Option[string] = none(string) # A description of the character
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID 

implDefaults(Rule)

proc newModel*(T: typedesc[Rule]): Rule = newRule()

type RuleRead* {.defaults, tableName: RULES_TABLE.} = ref object of Model
    name*: string = ""
    description*: Option[string] = none(string) # A description of the character
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)

implDefaults(RuleRead)

proc newModel*(T: typedesc[RuleRead]): RuleRead = newRuleRead()
