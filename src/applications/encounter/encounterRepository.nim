import encounterModel
import characterEncounterModel
import tinypool
import norm/[model, sqlite]
import sequtils
import ../genericArticleRepository

export encounterModel

proc getEncounterList*(): seq[EncounterRead] =
    result = getList[EncounterRead]()


proc getEncounterById*(encounterId: int64): EncounterRead =
    result = getEntryById[EncounterRead](encounterId)


proc deleteEncounter*(encounterId: int64) =
    deleteEntry[Encounter](encounterId)


proc updateEncounter*(encounterId: int64, encounterJsonData: string): EncounterRead =
    let encounter: Encounter = updateArticleEntry[Encounter](encounterId, encounterJsonData)
    result = getEncounterById(encounter.id)


proc createEncounter*(encounterJsonData: string): EncounterRead =
    let encounter: Encounter =  createArticleEntry[Encounter](encounterJsonData)
    result = getEncounterById(encounter.id)


proc getCharacterEncounters*(characterId: int64): seq[EncounterRead] =
    var entries: seq[CharacterEncounterRead] = @[]
    entries.add(newModel(CharacterEncounterRead))

    let condition: string = "character_id = ?"
    
    withDbConn(connection):
      connection.select(entries, condition, characterId)

    result = entries.map(proc(enc: CharacterEncounterRead): EncounterRead = enc.encounter_id)

