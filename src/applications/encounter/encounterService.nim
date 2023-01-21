import std/[options, strformat, json, jsonutils]
import norm/model
import ./encounterModel
import ./encounterRepository
import ../diaryentry/diaryEntryModel
import ../genericArticleRepository
import ../genericArticleService
import ../allUrlParams
import ../../applicationConstants
import ../../utils/djangoDateTime/[djangoDateTimeType, serialization]
import ../../database

export encounterModel


proc swapEncounterOrder*(encounter1Id: int64, encounter2Id: int64): JsonNode =
    var encounter1: Encounter = getEntryById(encounter1Id, Encounter)
    var encounter2: Encounter = getEntryById(encounter2Id, Encounter)
    
    if encounter1.diaryentry_id != encounter2.diaryentry_id:
        raise newException(DbError, fmt "The encouters with id {encounter1Id} and {encounter2Id} whose order is to be swapped are not from the same diaryentry!")

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


proc createEncounter*(connection: DbConn, requestParams: CreateParams, entry: var Encounter): Encounter =
    let creationTime: DjangoDateTime = djangoDateTimeType.now()
    entry.creation_datetime = creationTime
    entry.update_datetime = creationTime

    assert(
        entry.order_index.isSome() and entry.diaryentry_id != MODEL_INIT_ID and entry.title.isSome(),
        fmt "One of the required pieces of data was not specified! Required: order_index, diaryentry_id, title, sent: {requestParams.body}"
    )
    
    {.cast(gcsafe).}:
        connection.incrementOrderIndicesOfFollowingEncounters(
            entry.diaryentry_id, 
            entry.order_index.get()
        )
        result = connection.createArticle(requestParams.body, Encounter)

        

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
        
        var diaryentry = new(DiaryEntry)
        diaryentry.id = cutEncounter.diaryentry_id
        result = getManyFromOne(connection, diaryentry, EncounterRead)


proc readCampaignEncounters*(connection: DbConn, requestParams: ReadListParams): seq[EncounterRead] =
    result = connection.getCampaignEncounters(requestParams.campaignName)

proc readDiaryEntryEncounters*(connection: DbConn, diaryentryId: int64): seq[EncounterRead] =
    result = connection.getEncountersOfDiaryentry(diaryentryId)