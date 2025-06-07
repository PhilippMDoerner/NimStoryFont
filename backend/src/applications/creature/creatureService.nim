import std/tables
import norm/sqlite
import ./creatureModel
import ./creatureSerialization
import ../image/[imageService]

export creatureModel
export creatureSerialization

proc getCreatureImages*(
    con: DbConn, creatureIds: seq[int64]
): Table[int64, seq[Image]] =
  return con.getImagesForArticles(ImageType.CREATURETYPE, creatureIds)
