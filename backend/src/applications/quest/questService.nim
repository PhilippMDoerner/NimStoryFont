import std/[typetraits, tables]
import questModel
import ../../applicationConstants

export questModel

type QuestStateTable* = array[QuestState.enumLen(), Table[string, string]]

proc getQuestStateTable*(): QuestStateTable {.compileTime.} =
  var x = 0
  for state in QuestState:
    let stateTable = {"label": $state, "value": $state}.toTable()
    result[x] = stateTable
    x.inc
