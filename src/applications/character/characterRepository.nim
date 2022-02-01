import ../genericArticleRepository
import characterModel
import characterSerializable
import ../image/[imageModel]
import ../item/itemModel
import ../encounter/[encounterModel, characterEncounterModel]
import ../playerclass/playerClassModel
import ../organization/organizationModel
import tinypool
import norm/[model, sqlite]

export characterModel


proc getCampaignCharacterListOverview*(campaignName: string): seq[CharacterOverview] =
    ## lists all campaign entries using a limited but performant representation of a character
    result = getCampaignList[CharacterOverview](campaignName)


proc getCampaignCharacterList*(campaignName: string): seq[CharacterRead] =
    ## lists all campaign entries using a detailed representation of a character
    result = getCampaignList[CharacterRead](campaignName)

proc getFullCharacterData*(characterId: int64): CharacterSerializable =
    let character = getEntryById[CharacterRead](characterId)
    let images = getManyFromOne(character, Image)
    let encounters = getManyToMany(character, CharacterEncounterRead, EncounterRead)
    let playerClassConnections = getManyToMany(character, PlayerClassConnectionRead, PlayerClass)
    let items = getManyFromOne(character, ItemOverview)

    result = CharacterSerializable(
        character: character,
        images: images,
        items: items,
        encounters: encounters,
        playerClassConnections: playerClassConnections
    )

proc getCharacterByName*(campaignName: string, characterName: string): CharacterSerializable = 
    let character: CharacterRead = getEntryByName[CharacterRead](campaignName, characterName)
    result = getFullCharacterData(character.id)


proc getCharacterById*(characterId: int64): CharacterSerializable =
    result = getFullCharacterData(characterId)


proc deleteCharacter*(characterId: int) =
    deleteEntry[Character](characterId)


proc updateCharacter*(characterId: int, characterJsonData: string): CharacterSerializable =
    let character: Character = updateArticleEntry[Character](characterId, characterJsonData)
    result = getFullCharacterData(character.id)


proc createCharacter*(characterJsonData: string): CharacterSerializable =
    let character: Character = createArticleEntry[Character](characterJsonData)
    result = getFullCharacterData(character.id)


proc getOrganizationMembers*(organizationId: int): seq[OrganizationCharacter] =
    var entries: seq[OrganizationCharacter] = @[]
    entries.add(newModel(OrganizationCharacter))
    
    let condition: string = "organization_id = ?"
    
    withDbConn(connection):
      connection.select(entries, condition, organizationId)

    result = entries