import norm/[model, pragmas]
import options
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../authentication/authenticationModels
import ../../applicationSettings


type Campaign* {.defaults, tableName: CAMPAIGN_TABLE} = ref object of Model
    ##[A full dataset of a tabletop campaign]##
    name* {.unique.}: string = ""
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    is_deactivated*: bool = false
    background_image*: string = ""
    icon*: Option[string] = none(string)
    subtitle*: Option[string] = none(string)
    default_map_id*: Option[int64] = none(int64)
    has_audio_recording_permission*: bool = false
    admin_group_id*: Option[int64] = none(int64)
    admin_permission_id*: Option[int64] = none(int64)
    member_group_id*: Option[int64] = none(int64)
    member_permission_id*: Option[int64] = none(int64)
    guest_group_id*: Option[int64] = none(int64)
    guest_permission_id*: Option[int64] = none(int64)

implDefaults(Campaign)
proc newModel*(T: typedesc[Campaign]): Campaign = newCampaign()


type DefaultMap {.defaults, tableName: MAP_TABLE} = ref object of Model
    icon: Option[string] = none(string)
    image: string = ""
    name: string = ""

implDefaults(DefaultMap)

type CampaignRead* {.defaults, tableName: CAMPAIGN_TABLE.} = ref object of Model
    ##[A full dataset of a tabletop campaign]##
    name* {.unique.}: string = ""
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    is_deactivated*: bool = false
    background_image*: string = ""
    icon*: Option[string] = none(string)
    subtitle*: Option[string] = none(string)
    default_map_id*: Option[DefaultMap] = none(DefaultMap)
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
