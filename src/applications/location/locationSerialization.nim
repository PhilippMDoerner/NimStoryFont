import norm/model
import locationModel
import ../genericArticleRepository

type LocationSerializable* = LocationRead
type LocationOverviewSerializable* = LocationRead

proc serializeLocation*(connection: DbConn, entry: Location): LocationSerializable =
    result = connection.getEntryById(entry.id, LocationRead)

proc serializeLocationRead*(connection: DbConn, entry: LocationRead): LocationSerializable =
    result = entry

proc overviewSerialize*(connection: DbConn, entry: LocationRead): LocationOverviewSerializable =
    result = entry
