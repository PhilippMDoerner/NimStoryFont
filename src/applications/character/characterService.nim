import ../genericArticleRepository
import characterModel
import characterSerialization
import std/[sequtils, sugar]
import norm/[model, sqlite]
import ../../utils/databaseUtils
import ../allUrlParams
import ../genericArticleService

export characterModel

proc getCampaignCharacterList*(requestParams: ReadListParams): seq[CharacterOverviewSerializable] =
    ## lists all campaign entries using a limited but performant representation of a character
    withDbConn(connection):
        let entries = connection.getCampaignList(requestParams.campaignName, CharacterOverview)
        result = entries.map(entry => connection.overviewSerialize(entry))

proc getCharacterById*(requestParams: ReadByIdParams): CharacterSerializable =
    withDbConn(connection):
        result = connection.serialize(requestParams.id)

proc getCharacterByName*(requestParams: ReadByNameParams): CharacterSerializable =
    withDbConn(connection):
        result = connection.serialize(requestParams.campaignName, requestParams.articleName)

proc updateCharacter*(requestParams: UpdateParams): CharacterSerializable =
    withDbTransaction(connection):
        let updatedEntry = connection.updateArticle(requestParams.id, requestParams.body, Character)
        result = connection.serialize(updatedEntry.id)
        
proc deleteCharacter*(requestParams: DeleteParams) =
    deleteEntry(requestParams.id, Character)

proc getCharacterList*(requestParams: ReadListParams): seq[CharacterOverviewSerializable] =
    withDbConn(connection):
        let entries = connection.getCampaignList(requestParams.campaignName, CharacterOverview)
        result = entries.map(entry => connection.overviewSerialize(entry))

proc createCharacter*(requestParams: CreateParams): CharacterSerializable =
    withDbTransaction(connection):
        let createdEntry = connection.createArticle(requestParams.body, Character)
        result = connection.serialize(createdEntry.id)

