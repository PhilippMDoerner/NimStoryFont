import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[strformat, options, algorithm]
import constructor/defaults
import ../base_generics/genericArticleRepository

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

proc `$`*(model: Location): string = 
    var location = model
    var parentLocations: seq[Location] = @[]
    while location.parent_location_id.isSome():
        let parentLocation: Location = getEntryById[Location](model.parent_location_id.get())
        parentLocations.add(parentLocation)
        location = parentLocation
    
    parentLocations.reverse()
    for parentLocation in parentLocations:
        result.add(fmt "{parentLocation.name} - ")
    
    result.add(location.name)
