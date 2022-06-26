import ../genericArticleRepository
import characterModel
import characterEncounterModel
import ../image/[imageService]
import norm/[model, sqlite]
import characterRepository
import ../allUrlParams
import std/tables

export characterEncounterModel
export characterModel

proc createCharacterEncounterConnection*(connection: DbConn, characterId: int64, encounterId: int64): CharacterEncounterRead =
  var entry = CharacterEncounterConnection(character_id: characterId, encounter_id: encounterId)
  let createdEntry = connection.createEntryInTransaction(entry)
  result = connection.getEntryById(createdEntry.id, CharacterEncounterRead)

proc getNonPlayerCharacters*(connection: DbConn, requestParams: ReadListParams): seq[CharacterOverview] =
  result = connection.getNonPlayerCharacters(requestParams.campaignName)

proc getPlayerCharacters*(connection: DbConn, requestParams: ReadListParams): seq[CharacterOverview] =
  result = connection.getPlayerCharacters(requestParams.campaignName)

proc getCharacterImages*(connection: DbConn, characterIds: seq[int64]): Table[int64, seq[Image]] =
  result = connection.getImagesForArticles(ImageType.CHARACTERTYPE, characterIds)