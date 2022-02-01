import norm/[model, sqlite]
import ../genericArticleRepository
import itemModel
import tinypool

export itemModel

proc getItemList*(): seq[ItemRead] =
    result = getList[ItemRead]()


proc getItemById*(itemId: int64): ItemRead =
    result = getEntryById[ItemRead](itemId)


proc deleteItem*(itemId: int64) =
    deleteEntry[Item](itemId)


proc updateItem*(itemId: int64, itemJsonData: string): ItemRead =
    let item: Item = updateArticleEntry[Item](itemId, itemJsonData)
    result = getItemById(item.id)


proc createItem*(itemJsonData: string): ItemRead =
    let item: Item = createArticleEntry[Item](itemJsonData)
    result = getItemById(item.id)


proc getCharacterItems*(characterId: int64): seq[ItemOverview] =
    var entries: seq[ItemOverview] = @[]
    entries.add(newModel(ItemOverview))

    let condition: string = "owner_id = ?"
    
    withDbConn(connection):
      connection.select(entries, condition, characterId)
