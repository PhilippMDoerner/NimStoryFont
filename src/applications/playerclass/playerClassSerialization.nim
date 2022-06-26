import norm/[sqlite]
import ../../utils/djangoDateTime/djangoDateTimeType
import playerClassModel
import std/[sugar, sequtils]

type PlayerClassSerializable* = object
  name*: string
  pk*: int64
  update_datetime*: DjangoDateTime

proc serializePlayerClass*(entry: PlayerClass): PlayerClassSerializable =
  result = PlayerClassSerializable(
    name: entry.name,
    update_datetime: entry.update_datetime,
    pk: entry.id
  )

proc serializePlayerClass*(connection: DbConn, entry: PlayerClass): PlayerClassSerializable =
  result = serializePlayerClass(entry)

proc serializePlayerClasses*(connection: DbConn, entries: seq[PlayerClass]): seq[PlayerClassSerializable] =
  result = entries.map(entry => serializePlayerClass(entry))