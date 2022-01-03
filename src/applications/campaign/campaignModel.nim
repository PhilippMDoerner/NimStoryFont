import norm/[model, pragmas]
import options
import ../../utils/djangoDateTime/[djangoDateTimeType]

type Campaign* {.tableName: "wikientries_campaign".} = ref object of Model
    ##[A full dataset of a tabletop campaign]##
    name* {.unique.}: string
    creation_datetime*: DjangoDateTime
    update_datetime*: DjangoDateTime
    is_deactivated*: bool
    background_image*: string
    icon*: Option[string]
    subtitle*: Option[string]
    default_map_id*: Option[int]
    has_audio_recording_permission*: bool

type MinimumCampaignOverview* {.tableName: "wikientries_campaign".} = ref object of Model
    ##[HELPER MODEL: A minimal dataset of a tabletop campaign, solely used for serialization
    of other models (e.g. Character)]##
    name* {.unique.}: string

type CampaignOverview* {.tableName: "wikientries_campaign".} = ref object of Model
    ##[A reduced dataset of a tabletop campaign]##
    name* {.unique.}: string

proc newCampaign*(
    name: string = "",
    creation_datetime: DjangoDateTime = djangoDateTimeType.now(),
    update_datetime: DjangoDateTime = djangoDateTimeType.now(),
    is_deactivated: bool = false,
    background_image: string = "",
    icon: Option[string] = none(string),
    default_map_id: Option[int] = none(int),
    has_audio_recording_permission: bool = false
): Campaign =
    result = Campaign(
        name: name,
        creation_datetime: creation_datetime,
        update_datetime: update_datetime,
        is_deactivated: is_deactivated,
        background_image: background_image,
        icon: icon,
        default_map_id: default_map_id,
        has_audio_recording_permission: has_audio_recording_permission
    )

proc newCampaignOverview*(name: string = ""): CampaignOverview =
    result = CampaignOverview(name: name)

proc newMinimumCampaignOverview*(name: string = ""): MinimumCampaignOverview =
    result = MinimumCampaignOverview(name: name)