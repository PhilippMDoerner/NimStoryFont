import creatureModel
import norm/sqlite
import ../genericArticleRepository

type CreatureSerializable* = CreatureRead
type CreatureOverviewSerializable* = CreatureOverview


proc serializeCreatureRead*(connection: DbConn, entry: CreatureRead): CreatureSerializable =
    result = entry

proc serializeCreature*(connection: DbConn, entry: Creature): CreatureSerializable =
    let fullEntry = connection.getEntryById(entry.id, CreatureRead)
    result = connection.serializeCreatureRead(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: CreatureOverview): CreatureOverviewSerializable =
    result = entry
