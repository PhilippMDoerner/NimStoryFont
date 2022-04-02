import norm/model
import encounterModel
import ../genericArticleRepository

type EncounterSerializable* = EncounterRead
type EncounterOverviewSerializable* = EncounterRead

proc serialize*(connection: DbConn, entry: Encounter): EncounterSerializable =
    result = connection.getEntryById(entry.id, EncounterSerializable)

proc serialize*(connection: DbConn, entryId: int64): EncounterSerializable =
    let entry = connection.getEntryById(entryId, Encounter)
    result = connection.serialize(entry)

proc overviewSerialize*(connection: DbConn, entry: EncounterRead): EncounterOverviewSerializable =
    result = entry
