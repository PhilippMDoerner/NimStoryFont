import std/[options]
import norm/[model, pragmas]
import constructor/defaults
import ../user/userModel
import ../session/sessionModel
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/[djangoDateTimeType]

type DiaryEntry* {.defaults, tableName: DIARYENTRY_TABLE.} = ref object of Model
  title*: Option[string] = some("")
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id* {.fk: Session.}: int64 = MODEL_INIT_ID
  author_id* {.fk: User.}: int64 = MODEL_INIT_ID

implDefaults(DiaryEntry, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type DiaryEntrySession* {.defaults, readOnly, tableName: SESSION_TABLE.} = ref object of Model
  session_number*: int = -1
  session_date*: DjangoDateTime = djangoDateTimeType.now()
  is_main_session*: bool = true
  end_day*: Option[int] = some(-1)
  start_day*: Option[int] = some(-1)
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)

implDefaults(DiaryEntrySession, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type DiaryEntryUser {.defaults, readOnly, tableName: USER_TABLE.} = ref object of Model
  username*: string = ""

implDefaults(DiaryEntryUser, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type DiaryEntryRead* {.defaults, readOnly, tableName: DIARYENTRY_TABLE.} = ref object of Model
  title*: Option[string] = some("")
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  session_id*: DiaryEntrySession = new(DiaryEntrySession)
  author_id*: DiaryEntryUser = new(DiaryEntryUser)

implDefaults(DiaryEntryRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
