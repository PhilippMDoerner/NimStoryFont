import norm/[model, pragmas]
import constructor/defaults
import ../authentication/authenticationModels
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import std/[strformat, options]
import ../session/sessionModel
import ../base_generics/genericArticleRepository

type DiaryEntry* {.defaults, tableName: DIARYENTRY_TABLE} = ref object of Model
  title*: Option[string] = some("")
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id* {.fk: Session.}: int64 = MODEL_INIT_ID
  author_id* {.fk: User.}: int64 = MODEL_INIT_ID

implDefaults(DiaryEntry)

proc newModel*(T: typedesc[DiaryEntry]): DiaryEntry = newDiaryEntry()


proc campaign_id*(model: DiaryEntry): int64 =
  let session: Session = getEntryById[Session](model.session_id)
  result = session.campaign_id


proc `$`*(model: DiaryEntry): string =
  let session: Session = getEntryById[Session](model.session_id)
  
  result.add(fmt "Diary Entry #{session.session_number}")
  if model.title.isSome():
    result.add(fmt " - {model.title}")