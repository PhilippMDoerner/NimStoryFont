import encounterModel
import encounterRepository
import characterEncounterModel
import tinypool
import norm/[model, sqlite]
import ../diaryentry/diaryEntryModel
import ../genericArticleRepository
import ../../applicationConstants
import ../../applicationSettings
import std/[sequtils, options, strformat, json, jsonutils]
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType, serialization]
import ../../utils/databaseUtils

export encounterModel

proc getEncounterList*(): seq[EncounterRead] =
    result = getList(EncounterRead)


proc getEncounterById*(encounterId: int64): EncounterRead =
    result = getEntryById(encounterId, EncounterRead)

proc getEncounterById*(connection: DbConn, encounterId: int64): EncounterRead =
    result = connection.getEntryById(encounterId, EncounterRead)

proc getSerializedEncounter*(connection: DbConn, entry: Encounter): EncounterRead =
    result = connection.getEntryById(entry.id, EncounterRead)

proc deleteEncounter*(encounterId: int64) =
    deleteEntry(encounterId, Encounter)


proc updateEncounter*(encounterId: int64, encounterJsonData: string): EncounterRead =
    let encounter: Encounter = updateArticleEntry(encounterId, encounterJsonData, Encounter)
    result = getEncounterById(encounter.id)


proc swapEncounterOrder*(encounter1Id: int64, encounter2Id: int64): JsonNode =
    var encounter1: Encounter = getEntryById(encounter1Id, Encounter)
    var encounter2: Encounter = getEntryById(encounter2Id, Encounter)
    
    if encounter1.diaryentry_id != encounter2.diaryentry_id:
        raise newException(DbError, fmt "The encouters with id {encounter1Id} and {encounter2Id} whose order is to be swapped are not from the same diaryentry!")

    {.cast(gcsafe).}:
        withDbTransaction(connection):
            let orderIndex1 = encounter1.order_index
            encounter1.order_index = some(encounter2.order_index.get() + 1)
            connection.update(encounter1)

            encounter2.order_index = orderIndex1
            connection.update(encounter2)

            encounter1.order_index = some(encounter1.order_index.get() - 1)
            connection.update(encounter1)

            let swappedEncounters: seq[EncounterRead] = @[
                getEntryById(encounter1Id, EncounterRead),
                getEntryById(encounter2Id, EncounterRead)
            ]

            result = jsonutils.toJson(swappedEncounters)


proc createEncounter*(encounterJsonData: string): EncounterRead =
    var entry: Encounter = encounterJsonData.fromJson(Encounter)
    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    assert(
        entry.order_index.isSome() and entry.diaryentry_id != MODEL_INIT_ID and entry.title.isSome(),
        fmt "One of the required pieces of data was not specified! Required: order_index, diaryentry_id, title, sent: {encounterJsonData}"
    )

    var connection: MyDbConn = borrowConnection()
    
    {.cast(gcsafe).}:
        withDbTransaction(connection):
            connection.incrementOrderIndicesOfFollowingEncounters(
                entry.diaryentry_id, 
                entry.order_index.get()
            )
            entry = connection.createEntryInTransaction(entry)

        result = getEntryById(connection, entry.id, EncounterRead)
        

proc getCharacterEncounters*(characterId: int64): seq[EncounterRead] =
    var entries: seq[CharacterEncounterRead] = @[]
    entries.add(newModel(CharacterEncounterRead))

    let condition: string = "character_id = ?"
    
    withDbConn(connection):
      connection.select(entries, condition, characterId)

    result = entries.map(proc(enc: CharacterEncounterRead): EncounterRead = enc.encounter_id)
    

proc cutInsertEncounter*(encounterId: int64, oldOrderIndex: int, newOrderIndex: int): seq[EncounterRead] =
    withDbTransaction(connection):
        var cutEncounter = getEntryById(connection, encounterId, Encounter)
        
        var affectedEncounters = connection.getEncountersBetweenOrderIndices(
            cutEncounter.diaryentry_id, 
            oldOrderIndex, 
            newOrderIndex
        )

        let isInsertAfterCut = oldOrderIndex < newOrderIndex
        let isForwardsInsert = isInsertAfterCut
        if isForwardsInsert:
            connection.updateEncounterOrderAfterForwardsInsert(affectedEncounters, cutEncounter)
        else:
            connection.updateEncounterOrderAfterBackwardsInsert(affectedEncounters, cutEncounter)

        cutEncounter.order_index = some(newOrderIndex)
        connection.update(cutEncounter)
        
        var diaryentry = newModel(DiaryEntry)
        diaryentry.id = cutEncounter.diaryentry_id
        result = getManyFromOne(connection, diaryentry, EncounterRead)
