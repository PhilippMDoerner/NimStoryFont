import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[options]
import constructor/defaults


type 
    Location* {.defaults, tableName: LOCATION_TABLE.}= ref object of Model
        name*: string = ""
        description*: Option[string] = none(string)
        creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
        update_datetime*: DjangoDateTime = djangoDateTimeType.now()
        parent_location_id* {.fk: Location.}: Option[int64] = none(int64)
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID # The id of the campaign that this character occurred in

implDefaults(Location)

proc newTableModel*(T: typedesc[Location]): Location = newLocation()
proc newModel*(T: typedesc[Location]): Location = newLocation()


type GrandParentLocation* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    name*: string = ""
implDefaults(GrandParentLocation)
proc newModel*(T: typedesc[GrandParentLocation]): GrandParentLocation = newGrandParentLocation()

type ParentLocation* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
    name*: string = ""
    parent_location_id*: Option[GrandParentLocation] = some(newModel(GrandParentLocation))
implDefaults(ParentLocation)
proc newModel*(T: typedesc[ParentLocation]): ParentLocation = newParentLocation()

type 
    LocationRead* {.defaults, tableName: LOCATION_TABLE.}= ref object of Model
        name*: string = ""
        description*: Option[string] = none(string)
        creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
        update_datetime*: DjangoDateTime = djangoDateTimeType.now()
        parent_location_id*: Option[ParentLocation] = some(newModel(ParentLocation))
        campaign_id*: MinimumCampaignOverview = newModel(MinimumCampaignOverview) # The id of the campaign that this character occurred in

implDefaults(LocationRead)

proc newModel*(T: typedesc[LocationRead]): LocationRead = newLocationRead()

