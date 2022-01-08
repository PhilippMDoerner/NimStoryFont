import ../base_generics/genericArticleRepository
import characterModel
import ../image/[imageModel, imageRepository]
import ../item/itemRepository
import ../encounter/[encounterModel, characterEncounterModel]
import ../playerclass/playerClassRepository
import ../organization/organizationModel
import ../../utils/database



proc getCharacterList*(): seq[CharacterRead] =
    result = getList[CharacterRead]()


proc getCampaignCharacterListOverview*(campaignName: string): seq[CharacterOverview] =
    ## lists all campaign entries using a limited but performant representation of a character
    result = getCampaignList[CharacterOverview](campaignName)


proc getCampaignCharacterList*(campaignName: string): seq[CharacterRead] =
    ## lists all campaign entries using a detailed representation of a character
    result = getCampaignList[CharacterRead](campaignName)


proc getCharacterByName*(campaignName: string, characterName: string): CharacterSerializable = 
    let character: CharacterRead = getEntryByName[CharacterRead](campaignName, characterName)
    let images = getArticleImage(ImageType.CHARACTERTYPE, character.id)
    let encounters = getManyToMany(character, CharacterEncounterRead, "encounter_id")
    let playerClassConnections = getCharacterPlayerClasses(character.id)
    let items = getCharacterItems(character.id)

    result = CharacterSerializable(
        character: character,
        images: images,
        items: items,
        encounters: encounters,
        playerClassConnections: playerClassConnections
    )


proc getCharacterById*(characterId: int64): CharacterRead =
    result = getEntryById[CharacterRead](characterId)


proc deleteCharacter*(characterId: int) =
    deleteEntry[Character](characterId)


proc updateCharacter*(characterId: int, characterJsonData: string): CharacterRead =
    result = updateEntry[Character, CharacterRead](characterId, characterJsonData)


proc createCharacter*(characterJsonData: string): CharacterRead =
    result = createEntry[Character, CharacterRead](characterJsonData)


proc getOrganizationMembers*(organizationId: int): seq[OrganizationCharacter] =
    let db = getDatabaseConnection()
    var entries: seq[OrganizationCharacter] = @[]
    entries.add(newModel(OrganizationCharacter))

    let condition: string = "organization_id = ?"
    db.select(entries, condition, organizationId)

    result = entries