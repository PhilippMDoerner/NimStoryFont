import encounterModel
import encounterRepository
import characterEncounterModel
import tinypool
import norm/[model, sqlite]
import ../genericArticleRepository
import ../../applicationConstants
import ../../applicationSettings
import std/[sequtils, options, strformat]
import ../../utils/djangoDateTime/[normConversion, djangoDateTimeType, serialization]
import ../../utils/databaseUtils

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


proc swapEncounterOrder*(encounter1Id: int64, encounter2Id: int64) =
    var encounter1: Encounter = getEntryById[Encounter](encounter1Id)
    var encounter2: Encounter = getEntryById[Encounter](encounter2Id)

    let orderIndex1 = encounter1.order_index
    encounter1.order_index = encounter2.order_index
    encounter2.order_index = orderIndex1

    {.cast(gcsafe).}:
        var connection: MyDbConn = borrowConnection()
        connection.transaction:
            connection.update(encounter1)
            connection.update(encounter2)
        connection.recycleConnection()


proc getNextOrderIndex(connection: DbConn, encounter: Encounter): int =
    let nextEncounter: Option[Encounter] = connection.getNextEncounter(encounter)
    let isLastEncounter = nextEncounter.isNone()
    return if isLastEncounter: encounter.order_index.get() + ORDER_INDEX_INCREMENT else: nextEncounter.get().order_index.get()


proc incrementOrderIndicesOfFollowingEncounters*(connection: DbConn, diaryentryId: int64, orderIndex: int) =
    var followingEncounters: seq[Encounter] = getEncountersAtAndAfterOrderIndex(
        connection, 
        diaryentryId, 
        orderIndex
    )

    for followingEncounter in followingEncounters:
        var encounter: Encounter = deepCopy(followingEncounter)
        let newOrderIndex: int = connection.getNextOrderIndex(encounter)
        encounter.order_index = some(newOrderIndex) # TODO: make order_index a "NOT NULL" field, that shouldn't be an optional
        connection.update(encounter)


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
        connection.transaction:
            connection.incrementOrderIndicesOfFollowingEncounters(
                entry.diaryentry_id, 
                entry.order_index.get()
            )
            entry = connection.createEntryInTransaction(entry)

        result = getEntryById[EncounterRead](connection, entry.id)
        
    connection.recycleConnection()

proc getCharacterEncounters*(characterId: int64): seq[EncounterRead] =
    var entries: seq[CharacterEncounterRead] = @[]
    entries.add(newModel(CharacterEncounterRead))

    let condition: string = "character_id = ?"
    
    withDbConn(connection):
      connection.select(entries, condition, characterId)

    result = entries.map(proc(enc: CharacterEncounterRead): EncounterRead = enc.encounter_id)

