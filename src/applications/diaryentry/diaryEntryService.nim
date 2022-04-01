import diaryEntryModel
import ../genericArticleRepository
import ../genericArticleService
import norm/model
import ../../utils/databaseUtils
import std/[sequtils, sugar]
import diaryEntryRepository
import diaryEntrySerialization
import ../serializationUtils
import ../allUrlParams

export diaryEntryModel
export diaryEntrySerialization

proc getDiaryEntryById*(requestParams: ReadByIdParams): DiaryEntrySerializable =
  withDbConn(connection):
    let entry = connection.getEntryById(requestParams.id, DiaryEntry)
    result = connection.serialize(entry)

proc getDiaryEntryList*(requestParams: ReadListParams): seq[DiaryEntryOverviewSerializable] =
  let entries: seq[DiaryEntryRead] = getDiaryEntriesForCampaign(requestParams.campaignName)
  withDbConn(connection):
    result = entries.map(entry => connection.overviewSerialize(entry))

proc createDiaryEntry*(requestParams: CreateParams): DiaryEntrySerializable =
  withDbTransaction(connection):
    let newEntry = connection.createArticle(requestParams.body, DiaryEntry)
    result = connection.serialize(newEntry.id)
  
proc updateDiaryEntry*(requestParams: UpdateParams): DiaryEntrySerializable =
  withDbTransaction(connection):
    let updatedEntry = connection.updateArticle(requestParams.id, requestParams.body, DiaryEntry)
    result = connection.serialize(updatedEntry.id)

proc deleteDiaryEntry*(requestParams: DeleteParams) =
  deleteEntry(requestParams.id, DiaryEntry)

proc getDiaryEntry*(requestParams: ReadDiaryEntryParams): DiaryEntrySerializable =
  let entry = diaryEntryRepository.getDairyEntry(
    requestParams.campaignName, 
    requestParams.sessionNumber, 
    requestParams.isMainSession, 
    requestParams.userName
  )
  withDbConn(connection):
    result = connection.serialize(entry.id)
    