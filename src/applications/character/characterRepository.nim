import ../base_generics/genericArticleRepository
import characterModel
import characterSerializable
import ../image/[imageModel]
import ../item/itemModel
import ../encounter/[encounterModel, characterEncounterModel]
import ../playerclass/playerClassModel
import ../organization/organizationModel
import ../../utils/database
import norm/[model, sqlite]


proc getCampaignCharacterListOverview*(campaignName: string): seq[CharacterOverview] =
    ## lists all campaign entries using a limited but performant representation of a character
    result = getCampaignList[CharacterOverview](campaignName)


proc getCampaignCharacterList*(campaignName: string): seq[CharacterRead] =
    ## lists all campaign entries using a detailed representation of a character
    result = getCampaignList[CharacterRead](campaignName)

proc getFullCharacterData*(character: CharacterRead): CharacterSerializable =
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
    result = getFullCharacterData(character)


proc getCharacterById*(characterId: int64): CharacterSerializable =
    let character: CharacterRead = getEntryById[CharacterRead](characterId)
    result = getFullCharacterData(character)


proc deleteCharacter*(characterId: int) =
    deleteEntry[Character](characterId)


proc updateCharacter*(characterId: int, characterJsonData: string): CharacterSerializable =
    let character: CharacterRead = updateEntry[Character, CharacterRead](characterId, characterJsonData)
    result = getFullCharacterData(character)


proc createCharacter*(characterJsonData: string): CharacterSerializable =
    let character: CharacterRead = createEntry[Character, CharacterRead](characterJsonData)
    result = getFullCharacterData(character)


proc getOrganizationMembers*(organizationId: int): seq[OrganizationCharacter] =
    let db = createRawDatabaseConnection()
    var entries: seq[OrganizationCharacter] = @[]
    entries.add(newModel(OrganizationCharacter))
    
    let condition: string = "organization_id = ?"
    db.select(entries, condition, organizationId)

    result = entries