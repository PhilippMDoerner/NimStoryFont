import norm/[model, pragmas]
import options
import constructor/defaults
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../authentication/authenticationModels
import ../../applicationSettings
import ../../applicationConstants

type CampaignDefaultMap* {.defaults, readOnly, tableName: MAP_TABLE} = ref object of Model
    icon*: Option[string] = some("")
    image*: string = ""
    name*: string = ""

implDefaults(CampaignDefaultMap, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type Campaign* {.defaults, tableName: CAMPAIGN_TABLE} = ref object of Model
    ##[A full dataset of a tabletop campaign]##
    name* {.unique.}: string = ""
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    is_deactivated*: bool = false
    background_image*: string = ""
    icon*: Option[string] = some("")
    subtitle*: Option[string] = none(string)
    default_map_id* {.fk: CampaignDefaultMap.}: Option[int64] = none(int64)
    has_audio_recording_permission*: bool = false
    admin_group_id* {.fk: Group.}: Option[int64] = some(MODEL_INIT_ID)
    admin_permission_id* {.fk: Permission.}: Option[int64] = some(MODEL_INIT_ID)
    member_group_id* {.fk: Group.}: Option[int64] = some(MODEL_INIT_ID)
    member_permission_id* {.fk: Permission.}: Option[int64] = some(MODEL_INIT_ID)
    guest_group_id* {.fk: Group.}: Option[int64] = some(MODEL_INIT_ID)
    guest_permission_id* {.fk: Permission.}: Option[int64] = some(MODEL_INIT_ID)

implDefaults(Campaign, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})




type CampaignRead* {.defaults, readOnly, tableName: CAMPAIGN_TABLE.} = ref object of Model
    ##[A full dataset of a tabletop campaign]##
    name* {.unique.}: string = ""
    creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
    update_datetime*: DjangoDateTime = djangoDateTimeType.now()
    is_deactivated*: bool = false
    background_image*: string = ""
    icon*: Option[string] = some("")
    subtitle*: Option[string] = some("")
    default_map_id*: Option[CampaignDefaultMap] = some(new(CampaignDefaultMap))
    has_audio_recording_permission*: bool = false
    admin_group_id*: Option[Group] = some(new(Group))
    member_group_id*: Option[Group] = some(new(Group))
    guest_group_id*: Option[Group] = some(new(Group))

implDefaults(CampaignRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})





type MinimumCampaignOverview* {.defaults, readOnly, tableName: CAMPAIGN_TABLE.} = ref object of Model
    ##[HELPER MODEL: A minimal dataset of a tabletop campaign, solely used for serialization
    of other models (e.g. Character)]##
    name* {.unique.}: string = ""

implDefaults(MinimumCampaignOverview, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type CampaignOverview* {.defaults, readOnly, tableName: CAMPAIGN_TABLE.} = ref object of Model
    ##[A reduced dataset of a tabletop campaign]##
    name* {.unique.}: string = ""

implDefaults(CampaignOverview, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type EmptySearchResponse* {.defaults, tableName: EMPTY_SEARCH_RESPONSE_TABLE.} = ref object of Model
    text*: string = ""
    campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

implDefaults(EmptySearchResponse, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type Statistics* = object
    character_count*: int
    item_count*: int
    location_count*: int
    creature_count*: int
    diaryentry_count*: int
    encounter_count*: int
    organization_count*: int
    quest_count*: int
    quote_count*: int
    session_audio_count*: int
    timestamp_count*: int
    map_count*: int
    marker_count*: int
    spell_count*: int
    rule_count*: int