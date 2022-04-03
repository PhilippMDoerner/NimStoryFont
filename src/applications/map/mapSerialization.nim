import norm/model
import mapModel
import ../genericArticleRepository

type MapSerializable* = MapRead
type MapOverviewSerializable* = MapRead

proc serializeMap*(connection: DbConn, entry: Map): MapSerializable =
    result = connection.getEntryById(entry.id, MapRead)

proc serializeMapRead*(connection: DbConn, entry: MapRead): MapSerializable =
    result = entry

proc overviewSerialize*(connection: DbConn, entry: MapRead): MapOverviewSerializable =
    result = entry
