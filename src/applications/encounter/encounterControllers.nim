import std/[json, strutils]
import prologue
import jsony
import ./encounterService
import ./encounterModel
import ./encounterUtils
import ./encounterSerialization
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../controllerTemplates
import ../allUrlParams
import ../genericArticleControllers
import ../authentication/authenticationUtils
import ../../utils/djangoDateTime/serialization
import ../../database



proc swapEncounterOrder*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let jsonData: JsonNode = ctx.request.body().parseJson()
    let encounter1Id = jsonData["encounter1"].getInt().int64
    let encounter2Id = jsonData["encounter2"].getInt().int64

    respondOnError():
        let swappedEncounters: JsonNode = swapEncounterOrder(encounter1Id, encounter2Id)
        resp jsonResponse(swappedEncounters)

proc cutInsertEncounter*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let jsonData: JsonNode = ctx.request.body().parseJson()
    let cutEncounterId = jsonData["encounter"].getInt().int64
    let newOrderIndex = jsonData["new_order_index"].getInt()
    let oldOrderIndex = jsonData["old_order_index"].getInt()

    respondOnError():
        let diaryentryEncounters: seq[EncounterRead] = cutInsertEncounter(cutEncounterId, oldOrderIndex, newOrderIndex)
        resp jsonyResponse(ctx, diaryentryEncounters)

proc createEncounterInDiaryentry*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let params: CreateParams = ctx.extractQueryParams(CreateParams)

    var newEntry: Encounter = params.body.fromJson(Encounter)
    checkCreatePermission(ctx, newEntry)

    respondOnError():
        var data: seq[EncounterSerializable] = @[]
        
        withDbTransaction(connection):
            let createdEntry: Encounter = connection.createEncounter(params, newEntry)
            let diaryentryEncounters: seq[EncounterRead] = connection.readDiaryEntryEncounters(createdEntry.diaryentry_id)
            data = connection.serializeEncounterReads(diaryentryEncounters)

        resp jsonyResponse(ctx, data)