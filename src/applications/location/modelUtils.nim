import locationRepository
import std/[strformat]


proc `$`*(model: Location): string = 
    var parentLocations: seq[Location] = getParentLocations(model)

    for parentLocation in parentLocations:
        result.add(fmt "{parentLocation.name} - ")
    
    result.add(model.name)
