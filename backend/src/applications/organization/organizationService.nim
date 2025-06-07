import std/tables
import norm/sqlite
import ./organizationModel
import ../image/[imageService]

export organizationModel

proc getOrganizationImages*(
    con: DbConn, organizationIds: seq[int64]
): Table[int64, seq[Image]] =
  return con.getImagesForArticles(ImageType.ORGANIZATIONTYPE, organizationIds)
