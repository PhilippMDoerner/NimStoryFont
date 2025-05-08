import std/[sugar, sequtils]
import norm/[sqlite]
import ./playerClassModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/djangoDateTimeType

type PlayerClassSerializable* = object
  name*: string
  pk*: int64
  update_datetime*: DjangoDateTime

proc serializePlayerClass*(entry: PlayerClass): PlayerClassSerializable =
  result = PlayerClassSerializable(
    name: entry.name, update_datetime: entry.update_datetime, pk: entry.id
  )

proc serializePlayerClass*(
    connection: DbConn, entry: PlayerClass
): PlayerClassSerializable =
  result = serializePlayerClass(entry)

proc serializePlayerClasses*(
    connection: DbConn, entries: seq[PlayerClass]
): seq[PlayerClassSerializable] =
  result = entries.map(entry => serializePlayerClass(entry))

type PlayerClassConnectionSerializable* = object
  pk*: int64
  player_class*: int64
  character*: int64
  player_class_details*: PlayerClassSerializable

proc serializePlayerClassConnectionRead(
    entry: PlayerClassConnectionRead
): PlayerClassConnectionSerializable =
  result = PlayerClassConnectionSerializable(
    pk: entry.id,
    player_class: entry.player_class_id.id,
    character: entry.character_id,
    player_class_details: serializePlayerClass(entry.player_class_id),
  )

proc serializePlayerClassConnectionRead*(
    connection: DbConn, entry: PlayerClassConnectionRead
): PlayerClassConnectionSerializable =
  result = serializePlayerClassConnectionRead(entry)

proc serializePlayerClassConnection*(
    connection: DbConn, entry: PlayerClassConnection
): PlayerClassConnectionSerializable =
  let entry = connection.getEntryById(entry.id, PlayerClassConnectionRead)
  result = connection.serializePlayerClassConnectionRead(entry)
