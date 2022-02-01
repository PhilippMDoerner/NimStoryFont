import playerClassModel
import norm/[model, sqlite]
import sequtils
import ../genericArticleRepository
import tinypool

proc getCharacterPlayerClasses*(characterId: int64): seq[PlayerClass] =
    var entries: seq[PlayerClassConnectionRead] = @[]
    entries.add(newModel(PlayerClassConnectionRead))

    let condition: string = "character_id = ?"

    withDbConn(connection):
      connection.select(entries, condition, characterId)

    result = entries.map(proc(connection: PlayerClassConnectionRead): PlayerClass = connection.player_class_id)
