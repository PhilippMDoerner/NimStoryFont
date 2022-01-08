import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType
import std/options


type 
    Location* = ref object of Model
        name*: string
        description*: Option[string]
        creation_datetime*: DjangoDateTime
        update_datetime*: DjangoDateTime
        parent_location_id* {.fk: Location.}: Option[int64]
        campaign_id* {.fk: Campaign.}: int64 # The id of the campaign that this character occurred in


proc newLocation(
    name = "",
    description: Option[string] = none(string),
    creationDatetime: DjangoDateTime = djangoDateTimeType.now(),
    updateDatetime: DjangoDateTime = djangoDateTimeType.now(),
    campaign_id = -1,
    parent_location_id = none(int64)
): Location = 
    result = Location(
        name: name,
        description: description,
        creationDatetime: creationDatetime,
        updateDatetime: updateDatetime,
        campaign_id: campaign_id,
        parent_location_id: parent_location_id
    )

proc newTableModel*(T: typedesc[Location]): Location = newLocation()
proc newModel*(T: typedesc[Location]): Location = newLocation()
