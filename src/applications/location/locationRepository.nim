import locationModel
import ../base_generics/genericArticleRepository
import ../../applicationSettings

#TODO: Figure out how to do this in norm
# proc getLocationByName*(campaignName: string, parentLocationName: string, locationName: string): Location = 
    
#     var sqlCondition: string = fmt "{LOCATION_TABLE}.name = ? AND parentLocation.name = ?"

#     withDbConn(connection):
#         connection.select(entry, sqlCondition, locationName, parentLocationName)

#     result = entry 


proc getLocationById*(locationId: int64): Location =
    result = getEntryById[Location](locationId)
