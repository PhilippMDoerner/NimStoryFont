import prologue
import encounterService
import encounterModel
import std/[strutils, uri]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import jsony
import ../controllerTemplates

proc createCharacterView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let jsonData: string = ctx.request.body()
    
    respondBadRequestOnDbError():
        let newEntry: Encounter = createEncounter(jsonData)
        resp jsonyResponse[Encounter](ctx, newEntry)