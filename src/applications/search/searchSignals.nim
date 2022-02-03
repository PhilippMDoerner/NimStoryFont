import searchRepository
import ../core/[tableModel, signalSystem]
import ../character/characterModel
import ../creature/creatureModel
import std/[typetraits, strformat, db_sqlite]

proc createCharacterSearchEntry*(connection: DbConn, modelInstance: TableModelVariant) =
  addSearchEntry(connection, modelInstance.character)

connect(SignalType.stPostCreate, Character, createCharacterSearchEntry)

proc createCreatureSearchEntry*(connection: DbConn, modelInstance: TableModelVariant) =
  addSearchEntry(connection, modelInstance.creature)

connect(SignalType.stPostCreate, Creature, createCreatureSearchEntry)
