import std/[tables, sets, hashes, db_sqlite, typetraits, strutils]
import norm/model 
import tableModel

type SignalType* = enum
  stPostCreate
  stPreDelete
  stPostDelete
  stPostUpdate

type SignalEvent* = object
  modelInstance*: TableModelVariant
  connection*: DbConn

type SignalProcStore = object
  procs: Table[TableModelKind, Table[SignalType, HashSet[pointer]]]

var STORE {.global.}: SignalProcStore
proc hasTableKind(tableKind: TableModelKind): bool = STORE.procs.hasKey(tableKind)
proc hasSignal(signalType: SignalType, tableKind: TableModelKind): bool =
  result = hasTableKind(tableKind) and STORE.procs[tableKind].hasKey(signalType)



proc connect*[T: Model](signalType: SignalType, model: typedesc[T], signalProc: pointer) =
  ## Associates a proc with a given TableModel 
  const tableKind: TableModelKind = parseEnum[TableModelKind](name(T).toLower())

  if not hasTableKind(tableKind):
    STORE.procs[tableKind] = initTable[SignalType, HashSet[pointer]]()
  
  if not hasSignal(signalType, tableKind):
    STORE.procs[tableKind][signalType] = initHashSet[pointer]()

  STORE.procs[tableKind][signalType].incl(signalProc)



proc disconnect*[T: Model]( signalType: SignalType, model: typedesc[T], signalProc: pointer) =
  const tableKind: TableModelKind = parseEnum[TableModelKind](name(T))
  if not hasSignal(signalType, tableKind): return

  STORE.procs[tableKind][signalType].excl(signalProc)



proc triggerSignal*(signalType: SignalType, event: SignalEvent) =
  let tableKind: TableModelKind = event.modelInstance.kind
  if not hasSignal(signalType, tableKind): return

  let signalProcPointers = STORE.procs[tableKind][signalType]
  for procPointer in signalProcPointers:
    type TemporaryProcType = proc (connection: DbConn, modelInstance: TableModelVariant) {.nimcall.}
    let signalProc: TemporaryProcType = cast[TemporaryProcType](procPointer)

    signalProc(event.connection, event.modelInstance)