import norm/[sqlite]
import ../../utils/djangoDateTime/djangoDateTimeType
import playerClassModel

type PlayerClassSerializable* = object
  name*: string
  pk*: int64
  update_datetime*: DjangoDateTime

proc serializePlayerClass*(connection: DbConn, entry: PlayerClass): PlayerClassSerializable =
  result = PlayerClassSerializable(
    name: entry.name,
    update_datetime: entry.update_datetime,
    pk: entry.id
  )

proc serializePlayerClass*(entry: PlayerClass): PlayerClassSerializable =
  result = PlayerClassSerializable(
    name: entry.name,
    update_datetime: entry.update_datetime,
    pk: entry.id
  )