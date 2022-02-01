import creatureModel


proc `$`*(model: Creature | CreatureOverview | CreatureRead): string = 
    model.name