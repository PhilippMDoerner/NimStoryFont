import spellModel
import norm/sqlite
import ../genericArticleRepository

type SpellRead* = Spell
type SpellSerializable* = SpellRead


proc serializeSpellRead*(connection: DbConn, entry: SpellRead): SpellSerializable =
    result = entry

proc serializeSpell*(connection: DbConn, entry: Spell): SpellSerializable =
    let fullEntry = connection.getEntryById(entry.id, SpellRead)
    result = connection.serializeSpellRead(fullEntry)
