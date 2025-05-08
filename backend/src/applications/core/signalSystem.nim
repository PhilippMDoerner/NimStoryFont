import std/[tables, sets, hashes, typetraits, logging, strformat]
import norm/[sqlite, model]

type SignalType* = enum
  ## Denotes when a SignalProc is triggered. A signal can be triggered
  ## before or after a create/delete/update action.
  stPreCreate
  stPostCreate
  stPreDelete
  #stPostDelete #There can be no PostDelete Signal, the deleted entry gets nil'd by norm so you can't do anything with it
  stPreUpdate
  stPostUpdate

type SignalProcStore = object
  ## Stores pointers to all Signal procs. A Signal proc is a proc that is 
  ## executed before or after a create/update/delete action happens. They 
  ## are mapped to a specific Model type and a specific trigger time
  ## (determined by SignalType). SignalProcs always have the signature: 
  ## proc(connection: DbConn, modelInstance: <YOUR MODEL TYPE>).
  procs: Table[string, Table[SignalType, HashSet[pointer]]]

var STORE {.global.}: SignalProcStore
proc hasTableKind(tableKind: string): bool =
  STORE.procs.hasKey(tableKind)

proc hasSignal(signalType: SignalType, tableKind: string): bool =
  result = hasTableKind(tableKind) and STORE.procs[tableKind].hasKey(signalType)

proc connect*[T: Model](
    signalType: SignalType, model: typedesc[T], signalProc: pointer
) =
  ## Associates the given proc with the given model and signaltype. The signalProc is triggered
  ## whenever a model of the given type is manipulated either through an update, delete, or create
  ## action. Which of theses actions trigger the given signalproc is determined by the signalType.
  ## The SignalType also denotes whether the given signalProc is executed before or after the data
  ## manipulation takes place.
  const tableKind: string = name(T)

  if not hasTableKind(tableKind):
    STORE.procs[tableKind] = initTable[SignalType, HashSet[pointer]]()

  if not hasSignal(signalType, tableKind):
    STORE.procs[tableKind][signalType] = initHashSet[pointer]()

  STORE.procs[tableKind][signalType].incl(signalProc)

  let myLen = STORE.procs[tableKind][signalType].len()
  log(
    lvlInfo,
    fmt "SIGNALSYSTEM: Connected {signalType} signal to model {tableKind} - There is/are now {myLen} {signalType} signal(s)",
  )

proc triggerSignal*[T: Model](
    signalType: SignalType, connection: DbConn, modelInstance: var T
) =
  ## Triggers all stored signal procs for the given modelInstance and the given signalType
  {.cast(gcsafe).}:
    let tableKind: string = name(modelInstance.type)
    if not hasSignal(signalType, tableKind):
      return

    let signalProcPointers: HashSet[pointer] = STORE.procs[tableKind][signalType]
    for procPointer in signalProcPointers.items:
      type TempProc = proc(connection: DbConn, modelInstance: var T) {.nimcall.}
      let signalProc = cast[TempProc](procPointer)
      signalProc(connection, modelInstance)
