import creatureModel
import norm/sqlite
import ../genericArticleRepository

type CreatureSerializable* = CreatureRead
type CreatureOverviewSerializable* = CreatureOverview



proc serialize*(connection: DbConn, entry: CreatureRead): CreatureSerializable =
    result = entry

proc serialize*(connection: DbConn, entry: Creature): CreatureSerializable =
    let fullEntry = connection.getEntryById(entry.id, CreatureRead)
    result = connection.serialize(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: CreatureOverview): CreatureOverviewSerializable =
    result = entry


#TODO: Figure out how to delete this proc, it currently only exists because otherwise shit doesn't compile
proc serialize(connection: DbConn, campaignName: string, entryName: string): CreatureSerializable =
    let entry = connection.getEntryByName(campaignName, entryName, CreatureRead)
    result = connection.serialize(entry)