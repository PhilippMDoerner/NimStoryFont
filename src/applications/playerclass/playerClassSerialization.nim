import norm/[sqlite, pragmas]
import ../../applicationSettings
import ../../applicationConstants
import ../character/characterModel
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults
import playerClassModel

type PlayerClassSerializable* = object
  name: string
  pk: int64

proc serializePlayerClass*(connection: DbConn, entry: PlayerClass): PlayerClassSerializable =
  result = PlayerClassSerializable(
    name: entry.name,
    pk: entry.id
  )

proc serializePlayerClass*(entry: PlayerClass): PlayerClassSerializable =
  result = PlayerClassSerializable(
    name: entry.name,
    pk: entry.id
  )