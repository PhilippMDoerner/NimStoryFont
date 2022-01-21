import playerClassModel
import ../../utils/database
import norm/[model, sqlite]
import sequtils
import ../base_generics/genericArticleRepository

proc getCharacterPlayerClasses*(characterId: int64): seq[PlayerClass] =
    var entries: seq[PlayerClassConnectionRead] = @[]
    entries.add(newModel(PlayerClassConnectionRead))

    let condition: string = "character_id = ?"

    let poolConnection = borrowConnection()
    poolConnection.connection.select(entries, condition, characterId)
    recycleConnection(poolConnection)

    result = entries.map(proc(connection: PlayerClassConnectionRead): PlayerClass = connection.player_class_id)
