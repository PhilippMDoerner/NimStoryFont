import norm/[model, pragmas]
import std/[options]
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../../applicationSettings
import ../../applicationConstants
import ../campaign/campaignModel
import ../character/characterModel
import ../session/sessionModel

type Quest* {.defaults, tableName: QUEST_TABLE} = ref object of Model
  name*: string = ""
  status*: string = ""
  taker_id* {.fk: Character.}: Option[int64] = some(MODEL_INIT_ID)
  giver_id* {.fk: Character.}: Option[int64] = some(MODEL_INIT_ID)
  abstract*: Option[string] = some("")
  description*: Option[string] = some("")
  start_session_id* {.fk: Session.}: int64 = MODEL_INIT_ID
  end_session_id* {.fk: Session.}: Option[int64] = some(MODEL_INIT_ID)
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

implDefaults(Quest)
proc newModel*(T: typedesc[Quest]): Quest = newQuest()


type QuestCharacter* {.defaults, tableName: CHARACTER_TABLE} = ref object of Model
  name*: string
implDefaults(QuestCharacter)
proc newModel*(T: typedesc[QuestCharacter]): QuestCharacter = newQuestCharacter()
 

type QuestRead* {.defaults, tableName: QUEST_TABLE} = ref object of Model
  name*: string = ""
  status*: string = ""
  taker_id*: Option[Character] = some(newModel(Character))
  giver_id*: Option[Character] = some(newModel(Character))
  abstract*: Option[string] = some("")
  description*: Option[string] = some("")
  start_session_id*: SessionRead = newModel(SessionRead)
  end_session_id*: Option[SessionRead] = some(newModel(SessionRead))
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview)

implDefaults(QuestRead)
proc newModel*(T: typedesc[QuestRead]): QuestRead = newQuestRead()