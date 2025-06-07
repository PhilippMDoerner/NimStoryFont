import std/tables
import norm/sqlite
import ./itemModel
import ../image/[imageService]

export itemModel

proc getItemImages*(con: DbConn, itemIds: seq[int64]): Table[int64, seq[Image]] =
  return con.getImagesForArticles(ImageType.ITEMTYPE, itemIds)
