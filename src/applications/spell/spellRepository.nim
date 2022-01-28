import spellModel
import ../base_generics/genericArticleRepository

proc getSpellById*(spellId: int64): Spell =
    result = getEntryById[Spell](spellId)
