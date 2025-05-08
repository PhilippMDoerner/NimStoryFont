import norm/[model, pragmas]
import options
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../campaign/campaignModel

type Session* {.defaults, tableName: SESSION_TABLE.} = ref object of Model
  session_number*: int = -1
  session_date*: DjangoDateTime = djangoDateTimeType.now()
  is_main_session*: bool = true
  end_day*: Option[int] = some(-1)
  start_day*: Option[int] = some(-1)
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

implDefaults(Session, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type SessionRead* {.defaults, readOnly, tableName: SESSION_TABLE.} = ref object of Model
  session_number*: int = -1
  session_date*: DjangoDateTime = djangoDateTimeType.now()
  is_main_session*: bool = true
  end_day*: Option[int] = some(-1)
  start_day*: Option[int] = some(-1)
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id*: MinimumCampaignOverview = new(MinimumCampaignOverview)

implDefaults(SessionRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
