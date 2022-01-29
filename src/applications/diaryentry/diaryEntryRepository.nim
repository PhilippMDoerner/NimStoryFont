import diaryEntryModel
import ../base_generics/genericArticleRepository

export diaryEntryModel

proc getDiaryEntryById*(diaryentryId: int64): DiaryEntry =
    result = getEntryById[DiaryEntry](diaryentryId)
