import norm/[model, pragmas]
import options
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]

type Campaign* {.defaults, tableName: "wikientries_campaign".} = ref object of Model
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

implDefaults(Campaign)
proc newModel*(T: typedesc[Campaign]): Campaign = newCampaign()


type MinimumCampaignOverview* {.defaults, tableName: "wikientries_campaign".} = ref object of Model
    ##[HELPER MODEL: A minimal dataset of a tabletop campaign, solely used for serialization
    of other models (e.g. Character)]##
    name* {.unique.}: string = ""

implDefaults(MinimumCampaignOverview)
proc newModel*(T: typedesc[MinimumCampaignOverview]): MinimumCampaignOverview = newMinimumCampaignOverview()


type CampaignOverview* {.defaults, tableName: "wikientries_campaign".} = ref object of Model
    ##[A reduced dataset of a tabletop campaign]##
    name* {.unique.}: string = ""

implDefaults(CampaignOverview)
proc newModel*(T: typedesc[CampaignOverview]): CampaignOverview = newCampaignOverview()
