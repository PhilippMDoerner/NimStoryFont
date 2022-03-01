import diaryEntryService
import ../genericArticleRepository
import ../session/sessionModel
import std/[strformat, options]


proc campaign_id*(model: DiaryEntry): int64 =
  let session: Session = getEntryById(model.session_id, Session)
  result = session.campaign_id


proc `$`*(model: DiaryEntry): string =
  let session: Session = getEntryById(model.session_id, Session)
  
  result.add(fmt "Diary Entry #{session.session_number}")
  if model.title.isSome():
    result.add(fmt " - {model.title}")