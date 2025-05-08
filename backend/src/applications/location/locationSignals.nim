import std/[strformat, options]
import norm/sqlite
import ./locationUtils
import ./locationModel
import ../core/signalSystem

proc locationPreUpdateSignal*(connection: DbConn, modelInstance: var Location) =
  if connection.causesParentLocationCircle(modelInstance):
    raise newException(
      DbError,
      fmt "Location '{modelInstance.id}' can't be updated to have the parent id '{modelInstance.parent_location_id.get()}'. Doing so would make it a child location of one of its own current child locations!",
    )

proc connectLocationSignals*() =
  connect(SignalType.stPreUpdate, Location, locationPreUpdateSignal)
