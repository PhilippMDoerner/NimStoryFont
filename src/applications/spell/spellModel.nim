import norm/[model, pragmas]
import std/[options]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults


type Spell* {.defaults, tableName: SPELL_TABLE.} = ref object of Model
    ##[TableModel of the table of story characters. ]##
    name*: string = ""
    description*: string = "" # A description of the character
    spell_level*: 0..9 = 0
    casting_time*: string = ""
    range*: string = ""
    duration*: string = ""
    concentration*: bool = false
    ritual*: bool = false
    school*: string = ""
    saving_throw*: Option[string] = some("")
    components*: string = ""
    damage*: Option[string] = some("")
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

implDefaults(Spell)

proc newModel*(T: typedesc[Spell]): Spell = newSpell()