import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import std/options
import constructor/defaults

type ItemOwner* {.defaults, tableName: CHARACTER_TABLE.} = ref object of Model
    name*: string = ""

implDefaults(ItemOwner)
proc newModel*(T: typedesc[ItemOwner]): ItemOwner = newItemOwner()


type Item* {.defaults, tableName: ITEM_TABLE.} = ref object of Model
    description*: Option[string] = none(string)
    name*: string = ""
    owner_id* {.fk: ItemOwner.}: Option[int64] = none(int64)
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()

implDefaults(Item)
proc newModel*(T: typedesc[Item]): Item = newItem()
proc newTableModel*(T: typedesc[Item]): Item = newItem()


type ItemOverview* {.defaults, tableName: ITEM_TABLE.} = ref object of Model
    name*: string = ""
    campaign_id*: int64 = MODEL_INIT_ID
    owner_id* {.fk: ItemOwner.}: Option[int64] = none(int64)

implDefaults(ItemOverview)
proc newModel*(T: typedesc[ItemOverview]): ItemOverview = newItemOverview()


type ItemRead* {.defaults, tableName: ITEM_TABLE.} = ref object of Model
    description*: Option[string] = none(string)
    name*: string = ""
    owner_id*: Option[ItemOwner] = none(ItemOwner)
    campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()

implDefaults(ItemRead)
proc newModel*(T: typedesc[ItemRead]): ItemRead = newItemRead()
