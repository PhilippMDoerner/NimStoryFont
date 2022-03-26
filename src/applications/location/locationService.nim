import locationModel
import ../genericArticleRepository
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
    result = getEntryById(locationId, Location)


proc getParentLocations*(location: Location): seq[Location] =
    var currentLocation = location

    withDbConn(connection):
        while currentLocation.parent_location_id.isSome():
            let parentLocation: Location = getEntryById(currentLocation.parent_location_id.get(), Location)
            result.add(parentLocation)
            currentLocation = parentLocation
        
    result.reverse()

proc getLocationSerialization*(connection: DbConn, entry: Location): LocationRead =
    result = connection.getEntryById(entry.id, LocationRead)

proc getCampaignLocationList*(campaignName: string): seq[Location] =
    result = getCampaignList(campaignName, Location)