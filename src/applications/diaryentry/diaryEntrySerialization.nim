import norm/model
import diaryEntryModel
import ../genericArticleRepository

type DiaryEntrySerializable* = DiaryEntryRead
type DiaryEntryOverviewSerializable* = DiaryEntryRead

proc serializeDiaryEntry*(connection: DbConn, entry: DiaryEntry): DiaryEntrySerializable =
    result = connection.getEntryById(entry.id, DiaryEntryRead)

proc serializeDiaryEntryRead*(connection: DbConn, entry: DiaryEntryRead): DiaryEntrySerializable =
    result = entry

proc overviewSerialize*(connection: DbConn, entry: DiaryEntryRead): DiaryEntryOverviewSerializable =
    result = entry
