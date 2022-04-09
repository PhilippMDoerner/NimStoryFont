import ../genericArticleRepository
import characterModel
import characterEncounterModel
import norm/[model, sqlite]

export characterEncounterModel
export characterModel

proc createCharacterEncounterConnection*(connection: DbConn, characterId: int64, encounterId: int64): CharacterEncounterRead =
  var entry = CharacterEncounterConnection(character_id: characterId, encounter_id: encounterId)
  let createdEntry = connection.createEntryInTransaction(entry)
  result = connection.getEntryById(createdEntry.id, CharacterEncounterRead)
