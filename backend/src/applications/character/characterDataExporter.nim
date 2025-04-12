import std/[strformat, sequtils, json]
import norm/[model, sqlite]
import ./characterModel
import ./characterSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]
  
proc addCharacterListRequests(exportNode: var JsonNode, con: DbConn, campaignName: string, characters: seq[CharacterRead]) =
  let serializedCharacters = con.overviewSerialize(characters)
  let overviewUrl = fmt"/character/{campaignName}/overview/"
  exportNode[overviewUrl] = %*serializedCharacters
  
  let serializedPlayerCharacters = serializedCharacters.filterIt(it.playerCharacter)
  let playerCharacterOverviewUrl = fmt"/character/{campaignName}/nonplayercharacters/"
  exportNode[playerCharacterOverviewUrl] = %*serializedPlayerCharacters
  
  let serializedNonPlayerCharacters = serializedCharacters.filterIt(not it.playerCharacter)
  let nonplayerCharacterOverviewUrl = fmt"/character/{campaignName}/playercharacters/"
  exportNode[nonplayerCharacterOverviewUrl] = %*serializedNonPlayerCharacters

proc addCharacterRequests(exportNode: var JsonNode, con: DbConn, campaignName: string, characters: seq[CharacterRead]) =
  for character in characters:
    let pkUrl = fmt"/character/pk/{character.id}/"
    let nameUrl = fmt"/character/{campaignName}/{character.name}/"
    let serializedData = con.serializeCharacterRead(character)
    let serializedDataNode = %*serializedData
    exportNode[pkUrl] = serializedDataNode
    exportNode[nameUrl] = serializedDataNode

proc exportCharacterData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignCharacters = con.getCampaignList(campaign.name, CharacterRead)
  result.addCharacterListRequests(con, campaign.name, campaignCharacters)
  result.addCharacterRequests(con, campaign.name, campaignCharacters)
