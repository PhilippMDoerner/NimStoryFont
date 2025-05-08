import std/options
import norm/[model, pragmas]
import constructor/defaults
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType

type ItemOwner* {.defaults, readOnly, tableName: CHARACTER_TABLE.} = ref object of Model
  name*: string = ""

implDefaults(ItemOwner, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type Item* {.defaults, tableName: ITEM_TABLE.} = ref object of Model
  description*: Option[string] = some("")
  name*: string = ""
  owner_id* {.fk: ItemOwner.}: Option[int64] = some(MODEL_INIT_ID)
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()

implDefaults(Item, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ItemOverview* {.defaults, readOnly, tableName: ITEM_TABLE.} = ref object of Model
  name*: string = ""
  campaign_id*: int64 = MODEL_INIT_ID
  owner_id* {.fk: ItemOwner.}: Option[int64] = some(MODEL_INIT_ID)

implDefaults(ItemOverview, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ItemRead* {.defaults, readOnly, tableName: ITEM_TABLE.} = ref object of Model
  description*: Option[string] = some("")
  name*: string = ""
  owner_id*: Option[ItemOwner] = some(new(ItemOwner))
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()

implDefaults(ItemRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
