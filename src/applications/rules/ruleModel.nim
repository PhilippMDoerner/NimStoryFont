import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import ../campaign/campaignModel
import std/[options]
import constructor/defaults
import norm/[model, pragmas]

type Rule* {.defaults, tableName: RULES_TABLE.} = ref object of Model
    ##[TableModel of the table of story characters. ]##
    name*: string = ""
    description*: Option[string] = none(string) # A description of the character
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID # The id of the campaign that this character occurred in

implDefaults(Rule)

proc newModel*(T: typedesc[Rule]): Rule = newRule()

proc `$`*(model: Rule): string =
    result = model.name