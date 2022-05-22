import prologue
import encounterService
import encounterModel
import std/[json, strutils]
import ../../utils/[jwtContext, customResponses, errorResponses]
import jsony
import ../controllerTemplates
import ../../utils/djangoDateTime/[serialization]



proc swapEncounterOrder*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let jsonData: JsonNode = ctx.request.body().parseJson()
    let encounter1Id = jsonData["encounter1"].getInt().int64
    let encounter2Id = jsonData["encounter2"].getInt().int64

    respondBadRequestOnDbError():
        let swappedEncounters: JsonNode = swapEncounterOrder(encounter1Id, encounter2Id)
        resp jsonResponse(swappedEncounters)

proc cutInsertEncounter*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let jsonData: JsonNode = ctx.request.body().parseJson()
    let cutEncounterId = jsonData["encounter"].getInt().int64
    let newOrderIndex = jsonData["new_order_index"].getInt()
    let oldOrderIndex = jsonData["old_order_index"].getInt()

    respondBadRequestOnDbError():
        let diaryentryEncounters: seq[EncounterRead] = cutInsertEncounter(cutEncounterId, oldOrderIndex, newOrderIndex)
        resp jsonyResponse(ctx, diaryentryEncounters)
