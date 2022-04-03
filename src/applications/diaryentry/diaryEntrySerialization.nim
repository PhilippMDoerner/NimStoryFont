import norm/model
import diaryEntryModel
import ../genericArticleRepository

type DiaryEntrySerializable* = DiaryEntryRead
type DiaryEntryOverviewSerializable* = DiaryEntryRead

proc serialize*(connection: DbConn, entry: DiaryEntry): DiaryEntrySerializable =
    result = connection.getEntryById(entry.id, DiaryEntryRead)

proc serialize*(connection: DbConn, entry: DiaryEntryRead): DiaryEntrySerializable =
    result = entry

proc serialize*(connection: DbConn, entryId: int64): DiaryEntrySerializable =
    let entry = connection.getEntryById(entryId, DiaryEntry)
    result = connection.serialize(entry)

proc overviewSerialize*(connection: DbConn, entry: DiaryEntryRead): DiaryEntryOverviewSerializable =
    result = entry
