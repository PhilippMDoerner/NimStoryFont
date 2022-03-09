import prologue
import characterService
import characterModel
import characterSerializable
import std/[strutils, uri]
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../utils/djangoDateTime/serialization
import jsony
import ../controllerTemplates
import ../urlParamRegexPatterns


proc getCampaignCharactersOverviewView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM)

    respondBadRequestOnDbError():
        let characters: seq[CharacterOverview] = characterService.getCampaignCharacterListOverview(campaignName)
        resp jsonyResponse[seq[CharacterOverview]](ctx, characters)


proc getCharacterByIdView*(ctx: Context) {.async.} =
    let ctx = JWTContext(ctx)
    
    let characterId: int = parseInt(ctx.getPathParams(ID_PARAM))

    respondBadRequestOnDbError():
        let character = characterService.getCharacterbyId(characterId)
        resp jsonyResponse[CharacterSerializable](ctx, character)


proc getCharacterByNameView*(ctx: Context) {.async.} = 
    let ctx = JWTContext(ctx)
    
    let campaignName: string = ctx.getPathParams(CAMPAIGN_NAME_PARAM).decodeUrl()
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

    let characterId: int = parseInt(ctx.getPathParams(ID_PARAM))

    respondBadRequestOnDbError():
        deleteCharacter(characterId)
        respDefault(Http204)


proc updateCharacterView*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)

    let characterId: int = parseInt(ctx.getPathParams(ID_PARAM))
    let jsonData: string = ctx.request.body()

    respondBadRequestOnDbError():
        let updatedCharacterEntry = updateCharacter(characterId, jsonData)
        resp jsonyResponse[CharacterSerializable](ctx, updatedCharacterEntry)