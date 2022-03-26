import norm/[model, sqlite]
import ../genericArticleRepository
import itemModel
import tinypool

export itemModel


proc getCampaignItemListOverview*(campaignName: string): seq[Item] =
    result = getCampaignList(campaignName, Item)


proc getItemById*(itemId: int64): ItemRead =
    result = getEntryById(itemId, ItemRead)


proc getCharacterItems*(characterId: int64): seq[ItemOverview] =
    var entries: seq[ItemOverview] = @[]
    entries.add(newModel(ItemOverview))

    let condition: string = "owner_id = ?"
    
    withDbConn(connection):
      connection.select(entries, condition, characterId)


proc getSerializedItem*(connection: DbConn, entry: Item): ItemRead =
    result = connection.getEntryById(entry.id, ItemRead)


proc getItemByName*(campaignName: string, entryName: string): ItemRead =
    result = getEntryByName(campaignName, entryName, ItemRead)