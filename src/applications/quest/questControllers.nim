import std/[strutils, options, typetraits]
import prologue
import jsony
import ./questService
import ../genericArticleRepository
import ../../utils/[jwtContext, customResponses]
import ../../applicationConstants
    

proc getQuestStates*(ctx: Context) {.async.} =
  let ctx = JWTContext(ctx)

  const questStateTable: array[QuestState.enumLen(), Table[string, string]] = getQuestStateTable()

  resp jsonyResponse(ctx, questStateTable)