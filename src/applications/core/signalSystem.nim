import std/[tables, sets, hashes, db_sqlite, typetraits, strutils]
import norm/model 
import tableModel

type SignalType* = enum
  ## Denotes possible trigger points for signals, meaning the system will look
  ## for to execute appropriate signal procs after a create/delete/update action 
  ## or before a delete action.
  stPostCreate
  stPreDelete
  stPostDelete
  stPostUpdate

type SignalEvent* = object
  ## The event created by a create/update/delete action. Provides the instance
  ## that is being manipulated and the connection used by the transaction that 
  ## will perform this operation and has the current write lock on the database
  modelInstance*: TableModelVariant
  connection*: DbConn

type SignalProcStore = object
  ## Stores pointers to all Signal procs. A Signal proc is a proc that is 
  ## executed before or after a create/update/delete action happens. They 
  ## are associated with a specific TableModel and when they should trigger 
  ## (determined by SignalType). SignalProcs always have the signature
  ## proc(connection: DbConn, modelInstance: TableModelVariant).
  procs: Table[TableModelKind, Table[SignalType, HashSet[pointer]]]

var STORE {.global.}: SignalProcStore
proc hasTableKind(tableKind: TableModelKind): bool = STORE.procs.hasKey(tableKind)
proc hasSignal(signalType: SignalType, tableKind: TableModelKind): bool =
  result = hasTableKind(tableKind) and STORE.procs[tableKind].hasKey(signalType)

# TODO: Contemplate not using pointers, because your signal procs now all have the same signature
# of proc(connection: DbConn, modelInstance: TableModelVariant)

proc connect*[T: Model](signalType: SignalType, model: typedesc[T], signalProc: pointer) =
  ## Associates the given proc with the given model and signaltype. The signalProc is triggered
  ## whenever a model of the given type is manipulated either through an update, delete, or create
  ## action. Which of theses actions trigger the signal is determined by the signalType. The
  ## SignalType also denotes whether the given signalProc is executed before or after the data
  ## manipulation takes place.
  const tableKind: TableModelKind = parseEnum[TableModelKind](name(T).toLower())

  if not hasTableKind(tableKind):
    STORE.procs[tableKind] = initTable[SignalType, HashSet[pointer]]()
  
  if not hasSignal(signalType, tableKind):
    STORE.procs[tableKind][signalType] = initHashSet[pointer]()

  STORE.procs[tableKind][signalType].incl(signalProc)



proc disconnect*[T: Model]( signalType: SignalType, model: typedesc[T], signalProc: pointer) =
  ## Removes the given proc from the SignalProcStore. It thus prohibits that proc being 
  ## triggered whenever a model of the given type is manipulated, even if it was previously
  ## connected.
  const tableKind: TableModelKind = parseEnum[TableModelKind](name(T))
  if not hasSignal(signalType, tableKind): return

  STORE.procs[tableKind][signalType].excl(signalProc)



proc triggerSignal*(signalType: SignalType, event: SignalEvent) =
  ## Triggers all stored signal procs for the given modelInstance and the given signalType
  let tableKind: TableModelKind = event.modelInstance.kind
  if not hasSignal(signalType, tableKind): return

  let signalProcPointers = STORE.procs[tableKind][signalType]
  for procPointer in signalProcPointers:
    type TemporaryProcType = proc (connection: DbConn, modelInstance: TableModelVariant) {.nimcall.}
    let signalProc: TemporaryProcType = cast[TemporaryProcType](procPointer)

    signalProc(event.connection, event.modelInstance)