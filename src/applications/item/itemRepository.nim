import ../../utils/database
import norm/[model, sqlite]
import ../base_generics/genericArticleRepository
import itemModel


proc getItemList*(): seq[ItemRead] =
    result = getList[ItemRead]()


proc getItemById*(itemId: int64): ItemRead =
    result = getEntryById[ItemRead](itemId)


proc deleteItem*(itemId: int64) =
    deleteEntry[Item](itemId)


proc updateItem*(itemId: int64, itemJsonData: string): ItemRead =
    result = updateEntry[Item, ItemRead](itemId, itemJsonData)


proc createItem*(itemJsonData: string): ItemRead =
    result = createEntry[Item, ItemRead](itemJsonData)


proc getCharacterItems*(characterId: int64): seq[ItemOverview] =
    var entries: seq[ItemOverview] = @[]
    entries.add(newModel(ItemOverview))

    let condition: string = "owner_id = ?"
    
    let poolConnection = borrowConnection()
    poolConnection.connection.select(entries, condition, characterId)
    recycleConnection(poolConnection)