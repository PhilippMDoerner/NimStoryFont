import prologue
import characterService
import characterSerialization
import characterEncounterModel
import std/[strutils]
import ../../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import jsony
import ../controllerTemplates
import ../genericArticleRepository
import ../authentication/authenticationUtils

type CreateConnectionRequestBody* = object
  character*: string
  encounter*: int64
  campaign*: int64

proc createCharacterConnection*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let body = ctx.request.body.fromJson(CreateConnectionRequestBody)
    let characterId: int64 = body.character.parseInt().int64
    let encounterId: int64 = body.encounter
    let campaignId: int64 = body.campaign

    checkCreatePermission(ctx, campaignId)

    respondOnError():
      withDbTransaction(connection):

        let entry: CharacterEncounterRead = connection.createCharacterEncounterConnection(characterId, encounterId)
        let data = connection.serializeCharacterEncounterRead(entry)
        resp jsonyResponse(ctx, data)
