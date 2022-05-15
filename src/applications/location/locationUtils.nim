import locationService
import std/[strformat]
import norm/sqlite
import locationRepository

proc `$`*(model: Location | LocationRead): string = 
    var parentLocations: seq[Location] = readParentLocations(model)

    for parentLocation in parentLocations:
        result.add(fmt "{parentLocation.name} - ")
    
    result.add(model.name)

proc stringifyLocation*(connection: DbConn, model: Location | LocationRead): string =
    var parentLocations: seq[Location] = connection.getParentLocations(model.id)

    for parentLocation in parentLocations:
        result.add(fmt "{parentLocation.name} - ")

    result.add(model.name)