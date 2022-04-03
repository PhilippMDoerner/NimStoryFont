import norm/model
import encounterModel
import ../genericArticleRepository

type EncounterSerializable* = EncounterRead
type EncounterOverviewSerializable* = EncounterRead

proc serializeEncounter*(connection: DbConn, entry: Encounter): EncounterSerializable =
    result = connection.getEntryById(entry.id, EncounterRead)

proc serializeEncounterRead*(connection: DbConn, entry: EncounterRead): EncounterSerializable =
    result = entry

proc overviewSerialize*(connection: DbConn, entry: EncounterRead): EncounterOverviewSerializable =
    result = entry
