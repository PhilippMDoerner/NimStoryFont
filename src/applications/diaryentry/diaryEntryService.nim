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

proc getDiaryEntry*(connection: DbConn, requestParams: ReadDiaryEntryParams): DiaryEntrySerializable =
  result = diaryEntryRepository.getDairyEntry(
    connection,
    requestParams.campaignName, 
    requestParams.sessionNumber, 
    requestParams.isMainSession, 
    requestParams.userName
  )

    