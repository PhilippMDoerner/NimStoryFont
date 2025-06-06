import std/tables
import norm/[model, sqlite]
import ./characterModel
import ./characterEncounterModel
import ./characterOrganizationModel
import ./characterRepository
import ../image/[imageService]
import ../genericArticleRepository
import ../allUrlParams

export characterEncounterModel
export characterOrganizationModel
export characterModel

proc createCharacterEncounterConnection*(
    connection: DbConn, characterId: int64, encounterId: int64
): CharacterEncounterRead =
  var entry =
    CharacterEncounterConnection(character_id: characterId, encounter_id: encounterId)
  let createdEntry = connection.createEntryInTransaction(entry)
  result = connection.getEntryById(createdEntry.id, CharacterEncounterRead)

proc getNonPlayerCharacters*(
    connection: DbConn, requestParams: ReadListParams
): seq[CharacterOverview] =
  result = connection.getNonPlayerCharacters(requestParams.campaignName)

proc getPlayerCharacters*(
    connection: DbConn, requestParams: ReadListParams
): seq[CharacterOverview] =
  result = connection.getPlayerCharacters(requestParams.campaignName)

proc getCharacterImages*(
    connection: DbConn, characterIds: seq[int64]
): Table[int64, seq[Image]] =
  result = connection.getImagesForArticles(ImageType.CHARACTERTYPE, characterIds)

proc getOrganizationMemberships*[T: Model](
    connection: DbConn, characterId: int64, membershipModelType: typedesc[T]
): seq[T] =
  var character = new(Character)
  character.id = characterId

  result = connection.getManyFromOne(character, T)

proc getOrganizationMembers*(
    connection: DbConn, organizationId: int64
): seq[OrganizationMemberRead] =
  var organization = new(Organization)
  organization.id = organizationId

  result = connection.getManyFromOne(organization, OrganizationMemberRead)
