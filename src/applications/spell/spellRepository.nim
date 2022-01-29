import spellModel
import ../base_generics/genericArticleRepository

export spellModel

proc getSpellById*(spellId: int64): Spell =
    result = getEntryById[Spell](spellId)
