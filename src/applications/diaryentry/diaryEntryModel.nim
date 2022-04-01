import norm/[model, pragmas]
import constructor/defaults
import ../user/userModel
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import std/[options]
import ../session/sessionModel
import ../campaign/campaignModel

type DiaryEntry* {.defaults, tableName: DIARYENTRY_TABLE.} = ref object of Model
  title*: Option[string] = some("")
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id* {.fk: Session.}: int64 = MODEL_INIT_ID
  author_id* {.fk: User.}: int64 = MODEL_INIT_ID

implDefaults(DiaryEntry)

proc newModel*(T: typedesc[DiaryEntry]): DiaryEntry = newDiaryEntry()


type DiaryEntrySession {.defaults, tableName: SESSION_TABLE.} = ref object of Model
  session_number*: int = -1
  session_date*: DjangoDateTime = djangoDateTimeType.now()
  is_main_session*: bool = true
  end_day*: Option[int] = some(-1)
  start_day*: Option[int] = some(-1)
  campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)


implDefaults(DiaryEntrySession)

type DiaryEntryUser {.defaults, tableName: USER_TABLE.} = ref object of Model
    username*: string = ""

implDefaults(DiaryEntryUser)

type DiaryEntryRead* {.defaults, tableName: DIARYENTRY_TABLE.} = ref object of Model
  title*: Option[string] = some("")
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id*: DiaryEntrySession = newDiaryEntrySession()
  author_id*: DiaryEntryUser = newDiaryEntryUser()

implDefaults(DiaryEntryRead)

proc newModel*(T: typedesc[DiaryEntryRead]): DiaryEntryRead = newDiaryEntryRead()