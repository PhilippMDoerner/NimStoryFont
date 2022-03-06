import prologue
import characterService
import characterModel
import characterSerializable
import std/[strutils, uri]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import jsony
import ../controllerTemplates


proc getCampaignCharactersOverviewView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams("campaignName")

    respondBadRequestOnDbError():
        let characters: seq[CharacterOverview] = characterService.getCampaignCharacterListOverview(campaignName)
        resp jsonyResponse[seq[CharacterOverview]](ctx, characters)


proc getCharacterByIdView*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let characterId: int = parseInt(ctx.getPathParams("id"))

    respondBadRequestOnDbError():
        let character = characterService.getCharacterbyId(characterId)
        resp jsonyResponse[CharacterSerializable](ctx, character)


proc getCharacterByNameView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams("campaignName").decodeUrl()
    let characterName: string = ctx.getPathParams("articleName").decodeUrl()

    respondBadRequestOnDbError():
        let character = getCharacterByName(campaignName, characterName)
        resp jsonyResponse[CharacterSerializable](ctx, character)


proc createCharacterView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let jsonData: string = ctx.request.body()
    
    respondBadRequestOnDbError():
        let newCharacterEntry: CharacterSerializable = createCharacter(jsonData)
        resp jsonyResponse[CharacterSerializable](ctx, newCharacterEntry)


proc deleteCharacterView*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)

    let characterId: int = parseInt(ctx.getPathParams("id"))

    respondBadRequestOnDbError():
        deleteCharacter(characterId)
        respDefault(Http204)


proc updateCharacterView*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let characterId: int = parseInt(ctx.getPathParams("id"))
    let jsonData: string = ctx.request.body()

    respondBadRequestOnDbError():
        let updatedCharacterEntry = updateCharacter(characterId, jsonData)
        resp jsonyResponse[CharacterSerializable](ctx, updatedCharacterEntry)