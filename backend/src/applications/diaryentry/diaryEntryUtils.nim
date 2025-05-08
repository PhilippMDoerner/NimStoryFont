import std/[strformat, options]
import prologue except Session
import ./diaryEntryService
import ../genericArticleRepository
import ../session/sessionModel
import ../authentication/authenticationUtils
import ../allUrlParams
import ../../utils/jwtContext

proc campaign_id*(model: DiaryEntry): int64 =
  let session: Session = getEntryById(model.session_id, Session)
  result = session.campaign_id

proc campaign_id*(model: DiaryEntryRead): int64 =
  result = model.session_id.campaign_id.id

proc `$`*(model: DiaryEntry): string =
  let session: Session = getEntryById(model.session_id, Session)

  result.add(fmt "Diary Entry #{session.session_number}")
  if model.title.isSome():
    result.add(fmt " - {model.title.get()}")

proc `$`*(model: DiaryEntryRead): string =
  result.add(fmt "Diary Entry #{model.session_id.session_number}")
  if model.title.isSome():
    result.add(fmt " - {model.title.get()}")

proc checkDiaryEntryReadListPermission*(ctx: JWTContext, entries: seq[DiaryEntryRead]) =
  checkCampaignReadListPermission(ctx, entries)
