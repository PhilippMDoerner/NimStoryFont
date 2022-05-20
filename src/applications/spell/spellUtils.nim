import spellModel

proc `$`*(model: Spell | SpellRead): string = 
    model.name