import playerClassModel
import ../../utils/database
import norm/[model, sqlite]
import sequtils
import ../base_generics/genericArticleRepository

proc getCharacterPlayerClasses*(characterId: int64): seq[PlayerClass] =
    let db = createRawDatabaseConnection()
    var entries: seq[PlayerClassConnectionRead] = @[]
    entries.add(newModel(PlayerClassConnectionRead))

    let condition: string = "character_id = ?"
    db.select(entries, condition, characterId)

    result = entries.map(proc(connection: PlayerClassConnectionRead): PlayerClass = connection.player_class_id)
