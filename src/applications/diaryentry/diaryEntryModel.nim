import norm/[model, pragmas]
import constructor/defaults
import ../authentication/authenticationModels
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../session/sessionRepository
import std/options

type DiaryEntry* {.defaults, tableName: DIARYENTRY_TABLE} = ref object of Model
  title*: Option[string] = some("")
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id* {.fk: Session.}: int64 = MODEL_INIT_ID
  author_id* {.fk: User.}: int64 = MODEL_INIT_ID

implDefaults(DiaryEntry)

proc newModel*(T: typedesc[DiaryEntry]): DiaryEntry = newDiaryEntry()

proc campaign_id*(diaryentry: DiaryEntry): int64 =
  result = getSessionById(diaryentry.session_id).campaign_id