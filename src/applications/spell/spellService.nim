import spellModel
import ../genericArticleRepository

export spellModel

proc getSpellById*(spellId: int64): Spell =
    result = getEntryById[Spell](spellId)
