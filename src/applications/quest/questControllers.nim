import prologue
import std/[strutils, options, typetraits]
import ../../utils/[jwtContext, customResponses]
import jsony
import ../genericArticleRepository
import ../../applicationConstants

proc getQuestStateTable(): array[QuestState.enumLen(), Table[string, string]] {.compileTime.} =
  var x = 0
  for state in QuestState:
    let stateTable = {"label": $state, "value": $state}.toTable()
    result[x] = stateTable
    x.inc
    

proc getQuestStates*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  const questStateTable: array[QuestState.enumLen(), Table[string, string]] = getQuestStateTable()

  resp jsonyResponse(ctx, questStateTable)