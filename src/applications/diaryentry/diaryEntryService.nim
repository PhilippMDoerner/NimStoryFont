import diaryEntryModel
import ../genericArticleRepository
import ../../applicationSettings
import norm/model
import tinypool
import std/[sequtils, sugar, strformat]
import diaryEntryRepository
import diaryEntrySerialization
import ../serializationUtils

export diaryEntryModel

proc getDiaryEntryById*(diaryentryId: int64): DiaryEntry =
  let entry = getEntryById(diaryentryId, DiaryEntry)
  result = serializeDiaryEntry(entry)

proc getSerializedDiaryEntry*(connection: DbConn, entry: DiaryEntry): DiaryEntry =
  result = serializeDiaryEntry(entry)

proc getDiaryEntryById*(connection: DbConn, diaryentryId: int64): DiaryEntry =
  let entry = connection.getEntryById(diaryentryId, DiaryEntry)
  result = serializeDiaryEntry(entry)

proc getCampaignDiaryEntryListOverview*(campaignName: string): seq[DiaryEntryOverview] =
  let overviewEntries = getDiaryEntriesForCampaign(campaignName)
  result = overviewEntries.map(entry => overviewSerializeDairyEntry(entry))

proc createDiaryEntry*(jsonData: string): DiaryEntry =
  let newEntry = createArticleEntry(jsonData, DiaryEntry)
  result = getDiaryEntryById(newEntry.id)

proc deleteDiaryEntry*(entryId: int64) =
  deleteEntry(entryId, DiaryEntry)

proc getDiaryEntry*(campaignName: string, sessionNumber: int, isMainSession: 0..1, authorName: string): DiaryEntryOverview =
  result = diaryEntryRepository.getDairyEntry(campaignName, sessionNumber, isMainSession, authorName)