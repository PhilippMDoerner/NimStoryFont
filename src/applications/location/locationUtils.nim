import locationService
import std/[strformat]


proc `$`*(model: Location | LocationRead): string = 
    var parentLocations: seq[Location] = readParentLocations(model)

    for parentLocation in parentLocations:
        result.add(fmt "{parentLocation.name} - ")
    
    result.add(model.name)
