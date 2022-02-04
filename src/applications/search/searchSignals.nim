import searchRepository
import ../core/[signalSystem]
import ../character/characterModel
import ../creature/creatureModel
import std/[typetraits, strformat, db_sqlite]

proc createCharacterSearchEntry*(connection: DbConn, modelInstance: Character) =
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Character, createCharacterSearchEntry)

proc createCreatureSearchEntry*(connection: DbConn, modelInstance: Creature) =
  addSearchEntry(connection, modelInstance)

connect(SignalType.stPostCreate, Creature, createCreatureSearchEntry)
