import diaryEntryModel
import ../encounter/encounterModel
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

proc getCampaignDiaryEntryListOverview*(campaignName: string): seq[DiaryEntryOverview] =
  let overviewEntries = getDiaryEntriesForCampaign(campaignName)
  result = overviewEntries.map(entry => overviewSerializeDairyEntry(entry))

proc createDiaryEntry*(jsonData: string): DiaryEntry =
  let newEntry = createArticleEntry(jsonData, DiaryEntry)
  result = getDiaryEntryById(newEntry.id)

proc deleteDiaryEntry*(entryId: int64) =
  deleteEntry(entryId, DiaryEntry)