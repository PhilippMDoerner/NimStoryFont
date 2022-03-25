import ../genericArticleRepository
import characterModel
import characterSerializable
import ../image/imageModel
import ../item/itemModel
import ../encounter/[encounterModel, characterEncounterModel]
import ../playerclass/playerClassModel
import ../organization/organizationModel
import tinypool
import std/[sequtils, sugar]
import norm/[model, sqlite]
import ../../utils/databaseUtils


proc getCampaignCharacterListOverview*(campaignName: string): seq[CharacterOverviewSerializable] =
    ## lists all campaign entries using a limited but performant representation of a character
    let campaignCharacters: seq[CharacterOverview] = getCampaignList(campaignName, CharacterOverview)
    result = campaignCharacters.map(
        proc(character: CharacterOverview): CharacterOverviewSerializable =
            let images = if character.player_character: getManyFromOne(character, Image) else: @[]
            result = overviewSerializeCharacter(character, images)
    )


proc getCampaignCharacterList*(campaignName: string): seq[CharacterRead] =
    ## lists all campaign entries using a detailed representation of a character
    result = getCampaignList(campaignName, CharacterRead)


proc getFullCharacterData*(connection: sqlite.DbConn, characterId: int64): CharacterSerializable =
    let character = connection.getEntryById(characterId, CharacterRead)
    let images = connection.getManyFromOne(character, Image)
    let encounters = connection.getManyToMany(character, CharacterEncounterRead, EncounterRead)
    let playerClassConnections = connection.getManyToMany(character, PlayerClassConnectionRead, PlayerClass)
    let items = connection.getManyFromOne(character, ItemOverview)

    result = CharacterSerializable(
        character: character,
        images: images,
        items: items,
        encounters: encounters,
        playerClassConnections: playerClassConnections
    )

proc getFullCharacterData*(connection: sqlite.DbConn, character: Character): CharacterSerializable =
    result = getFullCharacterData(connection, character.id)


proc getCharacterByName*(campaignName: string, characterName: string): CharacterSerializable = 
    withDbTransaction(connection):
        let character: CharacterRead = connection.getEntryByName(campaignName, characterName, CharacterRead)
        result = connection.getFullCharacterData(character.id)


proc getCharacterById*(characterId: int64): CharacterSerializable =
    withDbConn(connection):
        result = connection.getFullCharacterData(characterId)


proc deleteCharacter*(characterId: int64) =
    deleteEntry(characterId, Character)


proc updateCharacter*(characterId: int64, characterJsonData: string): CharacterSerializable =
    withDbTransaction(connection):
        let character: Character = updateArticleEntry(characterId, characterJsonData, Character)
        result = connection.getFullCharacterData(character.id)


proc createCharacter*(characterJsonData: string): CharacterSerializable =
    withDbTransaction(connection):
        let character: Character = createArticleEntry(characterJsonData, Character)
        result = connection.getFullCharacterData(character.id)


proc getOrganizationMembers*(organizationId: int64): seq[OrganizationCharacter] =
    var entries: seq[OrganizationCharacter] = @[]
    entries.add(newModel(OrganizationCharacter))
    
    let condition: string = "organization_id = ?"
    
    withDbConn(connection):
      connection.select(entries, condition, organizationId)

    result = entries

