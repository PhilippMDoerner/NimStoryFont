import std/[options, strformat, algorithm, strutils, tables]
import norm/model
import ./locationModel
import ./locationRepository
import ../genericArticleRepository
import ../allUrlParams
import ../image/[imageService]
import ../../applicationConstants
import ../../database

export locationModel

proc getLocationByName*(
    connection: DbConn, params: ReadLocationByNameParams
): LocationRead =
  var entry: LocationRead = new(LocationRead)
  const locationTable: string = LocationRead.table()

  if params.parentLocationName.toLowerAscii() == NONE_STRING:
    var sqlCondition: string = fmt "{locationTable}.name = ? AND {locationTable}.parent_location_id IS NULL AND campaign_id.name = ?"
    let queryParams: array[2, DbValue] =
      [params.articleName.dbValue(), params.campaignName.dbValue()]
    connection.select(entry, sqlCondition, queryParams)
  else:
    var sqlCondition: string = fmt "{locationTable}.name = ? AND parent_location_id.name = ? AND campaign_id.name = ?"
    let queryParams: array[3, DbValue] = [
      params.articleName.dbValue(),
      params.parentLocationName.dbValue(),
      params.campaignName.dbValue(),
    ]
    connection.select(entry, sqlCondition, queryParams)

  result = entry

proc getParentLocations*(connection: DbConn, location: Location): seq[Location] =
  var currentLocation = location

  while currentLocation.parent_location_id.isSome():
    let parentLocation: Location =
      connection.getEntryById(currentLocation.parent_location_id.get(), Location)
    result.add(parentLocation)
    currentLocation = parentLocation

  result.reverse()

proc getParentLocations*(location: Location): seq[Location] =
  withDbConn(connection):
    result = connection.getParentLocations(location)

proc readParentLocations*(location: Location | LocationRead): seq[Location] =
  withDbConn(connection):
    result = locationRepository.getParentLocations(connection, location.id)

proc getLocationImages*(
    con: DbConn, locationIds: seq[int64]
): Table[int64, seq[Image]] =
  return con.getImagesForArticles(ImageType.LOCATIONTYPE, locationIds)
