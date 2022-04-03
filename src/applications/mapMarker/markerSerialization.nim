import markerModel
import norm/sqlite
import ../genericArticleRepository

type MarkerOverview* = Marker
type MarkerSerializable* = MarkerRead
type MarkerOverviewSerializable* = MarkerOverview


proc serializeMarkerRead*(connection: DbConn, entry: MarkerRead): MarkerSerializable =
    result = entry

proc serializeMarker*(connection: DbConn, entry: Marker): MarkerSerializable =
    let fullEntry = connection.getEntryById(entry.id, MarkerRead)
    result = connection.serializeMarkerRead(fullEntry)

proc serializeMarkerWithMapRead*(connection: DbConn, entry: MarkerWithMapRead): MarkerSerializable =
    let fullEntry = connection.getEntryById(entry.id, MarkerRead)
    result = connection.serializeMarkerRead(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: MarkerOverview): MarkerOverviewSerializable =
    result = entry

