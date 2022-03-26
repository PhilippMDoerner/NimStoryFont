import norm/[model, sqlite]
import ../genericArticleRepository
import itemModel
import tinypool

export itemModel

proc getItemList*(): seq[ItemRead] =
    result = getList(ItemRead)

proc getCampaignItemListOverview*(campaignName: string): seq[Item] =
    result = getCampaignList(campaignName, Item)


proc getItemById*(itemId: int64): ItemRead =
    result = getEntryById(itemId, ItemRead)


proc deleteItem*(itemId: int64) =
    deleteEntry(itemId, Item)


proc updateItem*(itemId: int64, itemJsonData: string): ItemRead =
    let item: Item = updateArticleEntry(itemId, itemJsonData, Item)
    result = getItemById(item.id)


proc createItem*(itemJsonData: string): ItemRead =
    let item: Item = createArticleEntry(itemJsonData, Item)
    result = getItemById(item.id)


proc getCharacterItems*(characterId: int64): seq[ItemOverview] =
    var entries: seq[ItemOverview] = @[]
    entries.add(newModel(ItemOverview))

    let condition: string = "owner_id = ?"
    
    withDbConn(connection):
      connection.select(entries, condition, characterId)


proc getSerializedItem*(connection: DbConn, entry: Item): ItemRead =
    result = connection.getEntryById(entry.id, ItemRead)