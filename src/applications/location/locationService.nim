import locationModel
import ../genericArticleRepository
import ../../applicationSettings
import ../../applicationConstants
import norm/model
import std/[options, strformat, algorithm, strutils]
import tinypool
import ../allUrlParams

export locationModel


proc getLocationByName*(connection: DbConn, params: ReadLocationByNameParams): LocationRead = 
    var entry: LocationRead = newModel(LocationRead)
    const locationTable: string = LocationRead.table()

    if params.parentLocationName.toLowerAscii() == NONE_STRING_LOWER:
        var sqlCondition: string = fmt "{locationTable}.name = ? AND {locationTable}.parent_location_id IS NULL AND campaign_id.name = ?"
        let queryParams: array[2, DbValue] = [params.articleName.dbValue(), params.campaignName.dbValue()]
        connection.select(entry, sqlCondition, queryParams)
    
    else:
        var sqlCondition: string = fmt "{locationTable}.name = ? AND parent_location_id.name = ? AND campaign_id.name = ?"
        let queryParams: array[3, DbValue] = [params.articleName.dbValue(), params.parentLocationName.dbValue(), params.campaignName.dbValue()]
        connection.select(entry, sqlCondition, queryParams)

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