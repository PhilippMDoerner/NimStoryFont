import norm/model
import diaryEntryModel

proc serializeDiaryEntry*(diaryEntry: DiaryEntry): DiaryEntry =
  result = diaryEntry

proc overviewSerializeDairyEntry*(diaryEntry: DiaryEntryOverview): DiaryEntryOverview =
  result = diaryEntry