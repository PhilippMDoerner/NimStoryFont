import norm/[model, pragmas]
import std/[options]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults
import ../playerclass/playerClassModel
import spellConstants


type Spell* {.defaults, tableName: SPELL_TABLE.} = ref object of Model
    name*: string = ""
    description*: string = ""
    spell_level*: SpellLevel = SpellLevel.slCANTRIP
    casting_time*: CastingTime = CastingTime.ctACTION
    range*: Range = Range.rFEET5
    duration*: SpellDuration = SpellDuration.sdINSTANT
    concentration*: bool = false
    ritual*: bool = false
    school*: MagicSchool = MagicSchool.msABJURATION
    saving_throw*: Option[SavingThrow] = some(SavingThrow.stDEXTERITY)
    components*: string = ""
    damage*: Option[string] = some("")
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

implDefaults(Spell, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type SpellRead* {.defaults, readOnly, tableName: SPELL_TABLE.} = ref object of Model
    name*: string = ""
    description*: string = ""
    spell_level*: SpellLevel = SpellLevel.slCANTRIP
    casting_time*: CastingTime = CastingTime.ctACTION
    range*: Range = Range.rFEET5
    duration*: SpellDuration = SpellDuration.sdINSTANT
    concentration*: bool = false
    ritual*: bool = false
    school*: MagicSchool = MagicSchool.msABJURATION
    saving_throw*: Option[SavingThrow] = some(SavingThrow.stDEXTERITY)
    components*: string = ""
    damage*: Option[string] = some("")
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)

implDefaults(SpellRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type SpellConnection*{.defaults, tableName: SPELL_PLAYERCLASS_TABLE.} = ref object of Model
    player_class_id* {.fk: PlayerClass.}: int64 = MODEL_INIT_ID
    spell_id* {.fk: Spell.}: int64 = MODEL_INIT_ID
implDefaults(SpellConnection, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type SpellConnectionRead*{.defaults, readOnly, tableName: SPELL_PLAYERCLASS_TABLE.} = ref object of Model
    player_class_id*: PlayerClass = new(PlayerClass)
    spell_id*: Spell = new(Spell)
implDefaults(SpellConnectionRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

