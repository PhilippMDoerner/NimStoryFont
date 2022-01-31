import locationModel
import ../base_generics/genericArticleRepository
import ../../applicationSettings
import norm/model
import std/[options, strformat, algorithm]
import tinypool

export locationModel


proc getLocationByName*(campaignName: string, parentLocationName: Option[string], locationName: string): LocationRead = 
    var entry: LocationRead = newModel(LocationRead)
    const locationTable: string = LocationRead.table()

    if parentLocationName.isSome():
        var sqlCondition: string = fmt "{locationTable}.name = ? AND parent_location_id.name = ? AND campaign_id.name = ?"
        withDbConn(connection):
            connection.select(entry, sqlCondition, locationName, parentLocationName, campaignName)

    else:
        var sqlCondition: string = fmt "{locationTable}.name = ? AND {locationTable}.parent_location_id IS NULL AND campaign_id.name = ?"
        withDbConn(connection):
            connection.select(entry, sqlCondition, locationName, campaignName)
 

    result = entry 


proc getLocationById*(locationId: int64): Location =
    result = getEntryById[Location](locationId)


proc getParentLocations*(location: Location): seq[Location] =
    var currentLocation = location

    withDbConn(connection):
        while currentLocation.parent_location_id.isSome():
            let parentLocation: Location = getEntryById[Location](currentLocation.parent_location_id.get())
            result.add(parentLocation)
            currentLocation = parentLocation
        
    result.reverse()
