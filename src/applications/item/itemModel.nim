import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType
import std/options

type ItemOwner* {.tableName: CHARACTER_TABLE.} = ref object of Model
    name*: string


type Item* {.tableName: ITEM_TABLE.} = ref object of Model
    description*: Option[string]
    name*: string
    owner_id* {.fk: ItemOwner.}: Option[int64]
    campaign_id*: int64
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime


type ItemOverview* {.tableName: ITEM_TABLE.} = ref object of Model
    name*: string
    campaign_id*: int64
    owner_id* {.fk: ItemOwner.}: Option[int64]


type ItemRead* {.tableName: ITEM_TABLE.} = ref object of Model
    description*: Option[string]
    name*: string
    owner_id*: Option[ItemOwner]
    campaign_id*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime



proc newItem(
    description = none(string),
    name = "",
    owner_id = none(int64),
    campaign_id = -1,
    update_datetime = djangoDateTimeType.now(),
    creation_datetime = djangoDateTimeType.now()
): Item =
    result = Item(
        description: description,
        name: name,
        owner_id: owner_id,
        campaign_id: campaign_id,
        update_datetime: update_datetime,
        creation_datetime: creation_datetime
    )


proc newItemRead(
    description = none(string),
    name = "",
    owner_id = none(ItemOwner),
    campaign_id = newMinimumCampaignOverview(),
    update_datetime = djangoDateTimeType.now(),
    creation_datetime = djangoDateTimeType.now()
): ItemRead =
    result = ItemRead(
        description: description,
        name: name,
        owner_id: owner_id,
        campaign_id: campaign_id,
        update_datetime: update_datetime,
        creation_datetime: creation_datetime
    )


proc newItemOverview(name = "", campaign_id = 1): ItemOverview =
    result = ItemOverview(name: name, campaign_id: campaign_id)


proc newModel*(T: typedesc[ItemOverview]): ItemOverview =
    result = newItemOverview()


proc newModel*(T: typedesc[Item]): Item =
    result = newItem()


proc newModel*(T: typedesc[ItemRead]): ItemRead =
    result = newItemRead()


proc newTableModel*(T: typedesc[Item]): Item =
    result = newItem()