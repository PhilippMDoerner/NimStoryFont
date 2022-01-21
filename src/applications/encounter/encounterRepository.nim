import encounterModel
import ../../utils/database
import norm/[model, sqlite]
import sequtils
import ../base_generics/genericArticleRepository


proc getEncounterList*(): seq[EncounterRead] =
    result = getList[EncounterRead]()


proc getEncounterById*(encounterId: int64): EncounterRead =
    result = getEntryById[EncounterRead](encounterId)


proc deleteEncounter*(encounterId: int64) =
    deleteEntry[Encounter](encounterId)


proc updateCharacter*(encounterId: int64, encounterJsonData: string): EncounterRead =
    result = updateEntry[Encounter, EncounterRead](encounterId, encounterJsonData)


proc createCharacter*(encounterJsonData: string): EncounterRead =
    result = createEntry[Encounter, EncounterRead](encounterJsonData)


proc getCharacterEncounters*(characterId: int64): seq[EncounterRead] =
    var entries: seq[CharacterEncounterRead] = @[]
    entries.add(newModel(CharacterEncounterRead))

    let condition: string = "character_id = ?"
    
    let poolConnection = borrowConnection()
    poolConnection.connection.select(entries, condition, characterId)
    recycleConnection(poolConnection)

    result = entries.map(proc(enc: CharacterEncounterRead): EncounterRead = enc.encounter_id)

