import std/[strformat, sequtils, sugar, options]
import norm/sqlite
import ./locationService
import ./locationRepository
import ../../applicationConstants

proc `$`*(model: Location | LocationRead): string =
  var parentLocations: seq[Location] = readParentLocations(model)

  for parentLocation in parentLocations:
    result.add(fmt "{parentLocation.name} - ")

  result.add(model.name)

proc getParentLocationName*(model: LocationRead): string =
  if model.parent_location_id.isNone():
    return NONE_STRING
  else:
    return model.parent_location_id.get().name

proc stringifyLocation*(connection: DbConn, model: Location | LocationRead): string =
  var parentLocations: seq[Location] = connection.getParentLocations(model.id)

  for parentLocation in parentLocations:
    result.add(fmt "{parentLocation.name} - ")

  result.add(model.name)

proc stringifyLocation*(model: Location, campaignLocations: seq[Location]): string =
  const forceBreak = 20 # to avoid endless while-loops
  var location = model
  var fullLocationName = model.name
  for i in 0 .. forceBreak:
    if location.parent_location_id.isNone():
      return fullLocationName

    let parentLocationId: int64 = location.parent_location_id.get()
    let parentLocations =
      campaignLocations.filter(location => location.id == parentLocationId)
    assert(
      parentLocations.len() == 1,
      fmt"Parent location of entry '{model.id} - {model.name}' had an invalid member in the ancestor chain! Entry '{location.id}' claims to have parentId '{parentLocationId}' but either no such entry exists in the list of locations in this campaign, or there is more than one! \n{campaignLocations.map(loc => loc.id)}",
    )
    let parentLocation = parentLocations[0]

    fullLocationName = fmt"{parentLocation.name} - {fullLocationName}"

    location = parentLocation

proc stringifyLocation*(
    model: LocationRead, campaignLocations: seq[LocationRead]
): string =
  const forceBreak = 20 # to avoid endless while-loops
  var location = model
  var fullLocationName = model.name
  for i in 0 .. forceBreak:
    if location.parent_location_id.isNone():
      return fullLocationName

    let parentLocationId: int64 = location.parent_location_id.get().id
    let parentLocations =
      campaignLocations.filter(location => location.id == parentLocationId)
    assert(
      parentLocations.len() == 1,
      fmt"Parent location of entry '{model.id} - {model.name}' had an invalid member in the ancestor chain! Entry '{location.id}' claims to have parentId '{parentLocationId}' but either no such entry exists in the list of locations in this campaign, or there is more than one! \n{campaignLocations.map(loc => loc.id)}",
    )
    let parentLocation = parentLocations[0]

    fullLocationName = fmt"{parentLocation.name} - {fullLocationName}"

    location = parentLocation

proc causesParentLocationCircle*(connection: DbConn, model: Location): bool =
  if model.parent_location_id.isNone():
    return false

  let futureParentLocations =
    connection.getParentLocations(model.parent_location_id.get())

  let modelIsItsOwnParent = futureParentLocations.any(loc => loc.id == model.id)
  result = modelIsItsOwnParent
