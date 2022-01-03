import ../base_generics/genericArticleRepository
import characterModel


proc getCharacterList*(): seq[CharacterRead] =
    result = getList[CharacterRead]()


proc getCampaignCharacterListOverview*(campaignName: string): seq[CharacterOverview] =
    ## lists all campaign entries using a limited but performant representation of a character
    result = getCampaignList[CharacterOverview](campaignName)


proc getCampaignCharacterList*(campaignName: string): seq[CharacterRead] =
    ## lists all campaign entries using a detailed representation of a character
    result = getCampaignList[CharacterRead](campaignName)


proc getCharacterByName*(campaignName: string, characterName: string): CharacterRead = 
    result = getEntryByName[CharacterRead](campaignName, characterName)


proc getCharacterById*(characterId: int64): CharacterRead =
    result = getEntryById[CharacterRead](characterId)


proc deleteCharacter*(characterId: int) =
    deleteEntry[Character](characterId)


proc updateCharacter*(characterId: int, characterJsonData: string): CharacterRead =
    result = updateEntry[Character, CharacterRead](characterId, characterJsonData)


proc createCharacter*(characterJsonData: string): CharacterRead =
    result = createEntry[Character, CharacterRead](characterJsonData)