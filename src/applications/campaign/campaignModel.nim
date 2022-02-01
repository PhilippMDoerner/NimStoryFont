import norm/[model, pragmas]
import options
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../authentication/authenticationModels
import ../../applicationSettings
import ../../applicationConstants


type Campaign* {.defaults, tableName: CAMPAIGN_TABLE} = ref object of Model
    ##[A full dataset of a tabletop campaign]##
    name* {.unique.}: string = ""
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    is_deactivated*: bool = false
    background_image*: string = ""
    icon*: Option[string] = some("")
    subtitle*: Option[string] = some("")
    default_map_id*: Option[int64] = some(MODEL_INIT_ID)
    has_audio_recording_permission*: bool = false
    admin_group_id* {.fk: Group.}: Option[int64] = some(MODEL_INIT_ID)
    admin_permission_id* {.fk: Permission.}: Option[int64] = some(MODEL_INIT_ID)
    member_group_id* {.fk: Group.}: Option[int64] = some(MODEL_INIT_ID)
    member_permission_id* {.fk: Permission.}: Option[int64] = some(MODEL_INIT_ID)
    guest_group_id* {.fk: Group.}: Option[int64] = some(MODEL_INIT_ID)
    guest_permission_id* {.fk: Permission.}: Option[int64] = some(MODEL_INIT_ID)

implDefaults(Campaign)
proc newModel*(T: typedesc[Campaign]): Campaign = newCampaign()


type CampaignDefaultMap {.defaults, tableName: MAP_TABLE} = ref object of Model
    icon: Option[string] = some("")
    image: string = ""
    name: string = ""

implDefaults(CampaignDefaultMap)
proc newModel*(T: typedesc[CampaignDefaultMap]): CampaignDefaultMap = newCampaignDefaultMap()

type CampaignRead* {.defaults, tableName: CAMPAIGN_TABLE.} = ref object of Model
    ##[A full dataset of a tabletop campaign]##
    name* {.unique.}: string = ""
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    is_deactivated*: bool = false
    background_image*: string = ""
    icon*: Option[string] = some("")
    subtitle*: Option[string] = some("")
    default_map_id*: Option[CampaignDefaultMap] = some(newModel(CampaignDefaultMap))
    has_audio_recording_permission*: bool = false
    admin_group_id*: Option[Group] = some(newModel(Group))
    member_group_id*: Option[Group] = some(newModel(Group))
    guest_group_id*: Option[Group] = some(newModel(Group))

implDefaults(CampaignRead)
proc newModel*(T: typedesc[CampaignRead]): CampaignRead = newCampaignRead()




type MinimumCampaignOverview* {.defaults, tableName: CAMPAIGN_TABLE.} = ref object of Model
    ##[HELPER MODEL: A minimal dataset of a tabletop campaign, solely used for serialization
    of other models (e.g. Character)]##
    name* {.unique.}: string = ""

implDefaults(MinimumCampaignOverview)
proc newModel*(T: typedesc[MinimumCampaignOverview]): MinimumCampaignOverview = newMinimumCampaignOverview()


type CampaignOverview* {.defaults, tableName: CAMPAIGN_TABLE.} = ref object of Model
    ##[A reduced dataset of a tabletop campaign]##
    name* {.unique.}: string = ""

implDefaults(CampaignOverview)
proc newModel*(T: typedesc[CampaignOverview]): CampaignOverview = newCampaignOverview()

