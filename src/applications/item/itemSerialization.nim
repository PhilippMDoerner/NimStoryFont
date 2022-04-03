import norm/model
import itemModel
import ../genericArticleRepository

type ItemSerializable* = ItemRead
type ItemOverviewSerializable* = ItemRead

proc serializeItem*(connection: DbConn, entry: Item): ItemSerializable =
    result = connection.getEntryById(entry.id, ItemRead)

proc serializeItemRead*(connection: DbConn, entry: ItemRead): ItemSerializable =
    result = entry

proc overviewSerialize*(connection: DbConn, entry: ItemRead): ItemOverviewSerializable =
    result = entry
