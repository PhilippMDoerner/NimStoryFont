import spellModel
import ../genericArticleRepository
import ../allUrlParams

export spellModel

proc createSpellConnection*(
    connection: DbConn, params: CreateParams, entry: var SpellConnection
): SpellConnection =
  connection.createEntryInTransaction(entry)
