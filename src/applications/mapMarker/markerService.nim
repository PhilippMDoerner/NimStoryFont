import ../genericArticleRepository
import markerModel
import norm/sqlite
export markerModel


proc getMarkerByName*(campaignName: string, entryName: string): MarkerRead = 
    result = getEntryByName(campaignName, entryName, MarkerRead)


proc getMarkerById*(entryId: int64): MarkerRead {.gcsafe.}=
    result = getEntryById(entryId, MarkerRead)


proc getMarkerSerialization*(connection: sqlite.DbConn, entry: Marker): MarkerRead {.gcsafe.}=
    result = connection.getEntryById(entry.id, MarkerRead)

