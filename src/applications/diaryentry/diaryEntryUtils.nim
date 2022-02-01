import diaryEntryRepository
import ../base_generics/genericArticleRepository
import ../session/sessionModel
import std/[strformat, options]


proc campaign_id*(model: DiaryEntry): int64 =
  let session: Session = getEntryById[Session](model.session_id)
  result = session.campaign_id


proc `$`*(model: DiaryEntry): string =
  let session: Session = getEntryById[Session](model.session_id)
  
  result.add(fmt "Diary Entry #{session.session_number}")
  if model.title.isSome():
    result.add(fmt " - {model.title}")